export function formatDateToString(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Los meses comienzan desde 0
    const day = date.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
}
//combertir fecha en formato string a aobjeto Date
export function formatStringToDate(fechaStr: string): Date {
    // Divide la cadena de fecha en partes: año, mes y día
    const [year, month, day] = fechaStr.split('-').map(Number);

    // Los meses en JavaScript son 0-indexed, por lo que restamos 1 al mes
    const fecha = new Date(year, month - 1, day);

    // Verifica si la fecha es válida
    if (isNaN(fecha.getTime())) {
        throw new Error("Fecha inválida proporcionada.");
    }

    return fecha;
}
export function convertISOStringToDateString(isoString: string): string {
    const date = new Date(isoString);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}
export function formartDateAndHour(fechaHora: string): { fecha: string; hora: string } {
    const fecha = new Date(fechaHora);

    // Obtener la fecha en formato yyyy-mm-dd
    const fechaStr = fecha.toISOString().split('T')[0];

    // Obtener la hora en formato HH:mm
    const horaStr = fecha.toISOString().split('T')[1].slice(0, 5);

    return {
        fecha: fechaStr,
        hora: horaStr
    };
}

export function addOneMont(fecha: string): string {
    // Crear una nueva fecha basada en la fecha dada
    let nuevaFecha; 

    //si no se ingresa una fecha definida
    if(!fecha){
        nuevaFecha = new Date()
    }else{
        nuevaFecha =  new Date(fecha);
    }

    // Incrementar el mes
    nuevaFecha.setMonth(nuevaFecha.getMonth() + 1);
    return formatDateToString(nuevaFecha);
}
//retorna la fecha de hoy y el dia 1 del mes actual
export function thisMonth() {
    const hoy = new Date();
    
    // Obtener el año y mes actual
    const year = hoy.getFullYear(); // Cuatro dígitos del año
    const month = (hoy.getMonth() + 1).toString().padStart(2, '0'); // Meses de 0-11, así que se suma 1
    
    // Crear la fecha del primer día del mes
    const primerDia = `${year}-${month}-01`;
    
    // Formatear la fecha de hoy
    const diaActual = hoy.getDate().toString().padStart(2, '0');
    const fechaHoy = `${year}-${month}-${diaActual}`;
    
    return {
        primerDia,
        fechaHoy
    };
}
//retorna la fecha de hay desde las 1 am y la hora actual
export function toDay(){
    const ahora = new Date();

    // Fecha de hoy a las 01:00 AM
    const hoyA01 = new Date();
    hoyA01.setHours(1, 0, 0, 0);

    // Formatear las fechas como string
    const fechaA01Str = hoyA01.toISOString(); // Puedes cambiar el formato si lo prefieres
    const fechaActualStr = ahora.toISOString();

    return {
        fechaA01: fechaA01Str,
        fechaActual: fechaActualStr
    };

}
//la fecha de hoy y la fecha de dias pasados segun el numero ingresado
export function getDateDaysAgo(diasAtras: number): { fechaHoy: string; fechaPasada: string } {
    const hoy = new Date();

    // Clonar la fecha de hoy y restar los días
    const fechaPasada = new Date(hoy);
    fechaPasada.setDate(hoy.getDate() - diasAtras);

    // Formatear las fechas en formato yyyy-mm-dd
    const fechaHoyStr = hoy.toISOString().split('T')[0];
    const fechaPasadaStr = fechaPasada.toISOString().split('T')[0];

    return {
        fechaHoy: fechaHoyStr,
        fechaPasada: fechaPasadaStr
    };
}