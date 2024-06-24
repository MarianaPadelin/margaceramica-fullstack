-- Función para calcular el total de horas de clase por mes -----

DROP FUNCTION IF EXISTS total_horas; 
DELIMITER \\ 
CREATE FUNCTION total_horas (fecha_finalizacion date, fecha_inicio date,  veces_por_semana int) returns int
reads sql data
BEGIN
	DECLARE total int;
    DECLARE division_por_dias int;
    SET total = datediff(fecha_finalizacion, fecha_inicio);
    if (fecha_finalización = null or fecha_inicio = null or veces_por_semana <> null) then
        set division_por_dias = 0;
        RETURN division_por_dias;
	else 
		set division_por_dias = (total / 7 * veces_por_semana );
        RETURN division_por_dias;
    end if;
	
END \\
    

select total_horas(fecha_finalizacion, fecha_inicio, veces_por_semana) from clases_dictadas where mes = 'mayo';

-- Función para calcular el sueldo de profe por clase
DROP FUNCTION IF EXISTS sueldo_por_clase; 

DELIMITER \\ 
CREATE FUNCTION sueldo_por_clase (honorarios_profesor int, id_prof int, id_cl int) returns int
reads sql data
BEGIN
	DECLARE total int;
    DECLARE horas int;
   -- DECLARE id_cl int;
   -- set id_cl = (select id_clase from sueldos where id_profesor = id_prof);
	SET horas = (select total_horas(fecha_finalización, fecha_inicio, veces_por_semana) from clases_dictadas where (mes = 'mayo' and id_profesor = id_prof and id_clase = id_cl));
    SET total = (honorarios_profesor * horas);
    RETURN total;
END \\


select sueldo_por_clase (honorarios_profesor, id_profesor, id_clase) from sueldos where (id_profesor = 1 and id_clase = 11); 


select id_clase from sueldos where id_profesor = 1;

-- Determinar la edad del alumno 
DROP FUNCTION IF EXISTS edad_alumnos;

DELIMITER //
CREATE FUNCTION edad_alumnos (fecha_nacimiento date) returns int
reads sql data
BEGIN
	DECLARE edad int; 
    SET edad = (year(curdate()) - year(fecha_nacimiento));
    RETURN EDAD; 
END//

select edad_alumnos(fecha_nacimiento) from alumnos;
