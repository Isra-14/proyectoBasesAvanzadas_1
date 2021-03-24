CREATE DATABASE ki_surveys;

use ki_surveys;

DROP TABLE IF EXISTS Cuestionario;
CREATE TABLE Cuestionario (
    id              INT              NOT NULL AUTO_INCREMENT,
    nombre          VARCHAR(150)     NOT NULL,
    info            VARCHAR(200)     NOT NULL,
    noPreguntas     INT              NOT NULL,

    PRIMARY KEY (id)
);

DROP TABLE IF EXISTS Preguntas;
CREATE TABLE Preguntas(
    id                  INT             NOT NULL,
    noPregunta          INT             NOT NULL AUTO_INCREMENT,
    pregunta            VARCHAR(200)    NOT NULL,
    tipoPregunta        VARCHAR(50)     NOT NULL,
    respuestasTotales   INT             NOT NULL,

    FOREIGN KEY (id) REFERENCES Cuestionario(id),
    PRIMARY KEY (noPregunta)
);

DROP TABLE IF EXISTS Respuestas;
CREATE TABLE Respuestas (
    idCuestionario  INT             NOT NULL,
    idPregunta      INT             NOT NULL,
    idRespuesta     INT             NOT NULL AUTO_INCREMENT,
    respuesta       VARCHAR(200)    NOT NULL,
    isCorrecta      INT             NOT NULL,

    FOREIGN KEY (idPregunta) REFERENCES Preguntas(noPregunta),
    PRIMARY KEY (idRespuesta)
);

DROP TABLE IF EXISTS Usuarios;
CREATE TABLE Usuarios(
    idUsuario       INT             NOT NULL,
    nombre          VARCHAR(100)    NOT NULL,
    contraseña      VARCHAR(50)     NOT NULL,

    PRIMARY KEY (idUsuario)

);

DROP TABLE IF EXISTS RespuestasU;
CREATE TABLE RespuestasU (
    idUsuario       INT             NOT NULL,
    idRespuesta     INT             NOT NULL,
    numIntento      INT             NOT NULL,

    FOREIGN KEY (idUsuario) REFERENCES Usuarios(idUsuario),
    FOREIGN KEY (idRespuesta) REFERENCES Respuestas(idRespuesta)
    PRIMARY KEY(numIntento)
);



# Procedimiento para insertar datos en la base

DROP PROCEDURE IF EXISTS guardar_datos;

DELIMITER //
CREATE PROCEDURE guardar_datos(IN datos JSON)
BEGIN
    DECLARE _id INT DEFAULT 0;
    DECLARE _idPregunta INT DEFAULT 0;
    DECLARE _nombre VARCHAR(50);
    DECLARE _info VARCHAR(150);
    DECLARE preguntasTotales INT DEFAULT 0;
    DECLARE _respuestasTotales INT DEFAULT 0;
    DECLARE iter1 INT DEFAULT 0;
    DECLARE iter2 INT DEFAULT 0;
    DECLARE _preguntasJSON JSON;

    DECLARE _preguntas VARCHAR(200);
    DECLARE _tipoPregunta VARCHAR(50);
    DECLARE _respuestasJSON JSON;

    DECLARE _respuesta VARCHAR(100);
    DECLARE respuestaCorrecta BOOL DEFAULT FALSE;

    SET _nombre = JSON_UNQUOTE(JSON_EXTRACT(datos, '$.nombre'));
    SET _info = JSON_UNQUOTE(JSON_EXTRACT(datos, '$.info'));
    SET preguntasTotales = JSON_LENGTH(JSON_EXTRACT(datos, '$.preguntas'));
    SET _preguntasJSON = JSON_EXTRACT(datos, '$.preguntas');

    IF ((SELECT COUNT(*) FROM Cuestionario WHERE nombre = _nombre AND info = _info AND noPreguntas = preguntasTotales) = 0)
        THEN
            INSERT INTO Cuestionario VALUES (0, _nombre, _info, preguntasTotales);
        END IF;
    SELECT id INTO _id FROM Cuestionario WHERE nombre = _nombre AND info = _info AND noPreguntas = preguntasTotales;

    SET iter1 = 0;

    WHILE iter1 < preguntasTotales DO
        SET _preguntas = JSON_UNQUOTE(JSON_EXTRACT(_preguntasJSON, CONCAT('$[',iter1,'].pregunta')));
        SET _tipoPregunta = JSON_UNQUOTE(JSON_EXTRACT(_preguntasJSON, CONCAT('$[',iter1,'].tipo_pregunta')));
        SET _respuestasJSON = JSON_EXTRACT(_preguntasJSON, CONCAT('$[',iter1,'].respuestas'));
        SET _respuestasTotales = JSON_LENGTH(JSON_EXTRACT(_preguntasJSON, CONCAT('$[',iter1,'].respuestas')));

        IF ((SELECT COUNT(*) FROM Preguntas WHERE id = _id AND pregunta = _preguntas) = 0)
            THEN
                INSERT INTO Preguntas VALUES (_id, 0, _preguntas, _tipoPregunta, _respuestasTotales);
        END IF;
        SELECT noPregunta INTO _idPregunta FROM Preguntas WHERE (pregunta = _preguntas);

        SET iter2 = 0;
        WHILE iter2 < _respuestasTotales DO
            SET _respuesta = JSON_UNQUOTE(JSON_EXTRACT(_respuestasJSON, CONCAT('$[',iter2,'].respuesta')));
            SET respuestaCorrecta = JSON_EXTRACT(_respuestasJSON, CONCAT('$[',iter2,'].opcion_correcta'));

            IF ((select count(*) from respuestas where idPregunta = _idPregunta and respuesta = _respuesta) = 0) THEN
                    INSERT INTO respuestas VALUES(_id, _idPregunta, 0, _respuesta, respuestaCorrecta);
                    END IF;

                SET iter2 = iter2 + 1;
                END WHILE;

            SET iter1 = iter1 + 1;
        END WHILE;
    END //

DELIMITER ;

DELETE FROM cuestionario WHERE id= 18;
DELETE FROM preguntas WHERE id= 18;
DELETE FROM respuestas WHERE idCuestionario= 18;

SELECT * from cuestionario;
SELECT * from preguntas;
SELECT * from respuestas;

CALL guardar_datos('{"nombre":"La ultima y nos vamos","info":"Probablemente no sea asi","preguntas":[{"pregunta":"Pollito con...","tipo_pregunta":"OpcMultiple","respuestas":[{"respuesta":"Papas","opcion_correcta":true},{"respuesta":"Lechuga","opcion_correcta":false},{"respuesta":"Personas","opcion_correcta":false},{"respuesta":"Chocolate","opcion_correcta":false}]},{"pregunta":"Que refrescos te gustan mas","tipo_pregunta":"Multi","respuestas":[{"respuesta":"Coca cola","opcion_correcta":true},{"respuesta":"Pepsi","opcion_correcta":true},{"respuesta":"Red Cola","opcion_correcta":false}]},{"pregunta":"Si yo fuera mujer (sigue la cancion)","tipo_pregunta":"Abierta","respuestas":[{"respuesta":"0","opcion_correcta":true}]}]}')