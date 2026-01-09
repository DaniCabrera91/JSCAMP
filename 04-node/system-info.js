//Cuando se importa un módulo nativo de NodeJS indicar node: antes del nombre
// del módulo es opcional pero recomendado para evitar conflictos con módulos de terceros

import os from 'node:os';
import ms from 'ms';

console.log('Información del sistema operativo:');
console.log('Tipo de SO:', os.type());
console.log('Plataforma:', os.platform());
console.log('Arquitectura:', os.arch());
console.log('Memoria total (bytes):', os.totalmem());
console.log('Memoria libre (bytes):', os.freemem());
console.log('Número de CPUs:', os.cpus().length);
console.log('Directorio home del usuario:', os.homedir());
console.log('Tiempo de actividad del sistema:', ms(os.uptime() * 1000, { long: true }));
console.log('Información de red:', os.networkInterfaces());
console.log('-----------------------------------');
console.log('Información de la CPU:');