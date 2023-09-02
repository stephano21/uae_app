export const formatoDeFecha = () => {
  const FormatoFecha = (fecha: string): string => {
    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
      timeZone: 'America/Guayaquil',
    };

    const formattedDate: string = new Intl.DateTimeFormat(
      'es-ES',
      options,
    ).format(new Date(fecha));
    return formattedDate.replace(/\//g, '/').replace(',', '');
  };

  const FormatoFechaAgenda = (date: string) => {
    const formarLaFechita = new Date(date);
    const diasSemana = formarLaFechita.toLocaleString('es-ES', {
      weekday: 'long',
    });
    const Mayuscula = diasSemana.charAt(0).toUpperCase() + diasSemana.slice(1);
    const diayMes = formarLaFechita.getDate();
    const mesesitos = formarLaFechita.toLocaleString('es-ES', {
      month: 'short',
    });
    const MesesitoxD = mesesitos.charAt(0).toUpperCase() + mesesitos.slice(1);
    return `${Mayuscula.substring(0, 3)}\n${diayMes} ${MesesitoxD}`;
  };
  const weekDates = (date: string) => {
    const formarLaFechita = new Date(date);
    const dayIndex = formarLaFechita.getDay(); // Obtén el índice del día de la semana (0: Domingo, 1: Lunes, ..., 6: Sábado)
    const diasSemana = [
      'D', // Domingo
      'L', // Lunes
      'M', // Martes
      'M', // Miércoles
      'J', // Jueves
      'V', // Viernes
      'S', // Sábado
    ];
    const Mayuscula = diasSemana[dayIndex];
    const diayMes = formarLaFechita.getDate();
    const mesesitos = formarLaFechita.toLocaleString('es-ES', {
      month: 'short',
    });
    return `${Mayuscula}\n${diayMes}`;
  };

  const convertToGMTMenos5 = (utc: string) => {
    const dateUTC = new Date(utc); //Obtenemos la fecha en UTC
    const gmtMinus5Offset = -5 * 60 * 60 * 1000; //Esta es la funcion que establece las horas
    const dateGMTMinus5 = new Date(dateUTC.getTime() + gmtMinus5Offset); //Calculamos la diferencia horaria de GMT -5 y la sumamos a la UTC
    return dateGMTMinus5.toISOString();
  };

  return {
    FormatoFecha,
    FormatoFechaAgenda,
    weekDates,
    convertToGMTMenos5,
  };
};
