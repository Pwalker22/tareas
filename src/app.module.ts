/* eslint-disable prettier/prettier */
// Importar el módulo necesario del framework NestJS
import { Module } from '@nestjs/common';

// Importar el controlador AppController y el servicio AppService
import { AppController } from './app.controller';
import { AppService } from './app.service';

// Importar el módulo TasksModule para su configuración
import { TasksModule } from './tasks/tasks.module';

// Definir una clase de módulo usando el decorador Module
@Module({
  // Especificar los controladores que pertenecen a este módulo (AppController)
  controllers: [AppController],
  
  // Especificar los proveedores (servicios) que pertenecen a este módulo (AppService)
  providers: [AppService],

  // Importar y configurar el módulo TasksModule en este módulo
  imports: [TasksModule],
})
export class AppModule {}
