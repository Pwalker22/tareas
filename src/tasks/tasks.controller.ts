/* eslint-disable prettier/prettier */  // Deshabilitar el formateo de eslint para este archivo

// Importar los módulos necesarios del framework NestJS
import { Controller, Get, Post, Param, Body, Put, Delete } from '@nestjs/common';

// Importar los servicios TasksService y los tipos Task y TaskStatus desde los archivos tasks.service y tasks.entity
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './tasks.entity';

// Definir una clase de controlador usando el decorador Controller con la ruta base 'tasks'
@Controller('tasks')
export class TasksController {
    // Inyectar el servicio TasksService en el controlador
    constructor(private readonly tasksService: TasksService) {}

    // Manejar la solicitud HTTP GET para obtener todas las tareas
    @Get()
    getAllTasks(): Task[] {
        return this.tasksService.getAllTasks();
    }

    // Manejar la solicitud HTTP GET para obtener una tarea por ID
    @Get(':id')
    getTaskById(@Param('id') id: string): Task {
        return this.tasksService.getTaskById(parseInt(id, 10));
    }

    // Manejar la solicitud HTTP POST para crear una nueva tarea
    @Post()
    createTask(@Body() body: { title: string; description: string; status?: TaskStatus }): Task {
        const { title, description, status } = body;
        return this.tasksService.createTask(title, description, status);
    }

    // Manejar la solicitud HTTP PUT para actualizar una tarea por ID
    @Put(':id')
    updateTask(@Param('id') id: string, @Body() updateFields: { title?: string; description?: string; status?: TaskStatus }): Task {
        return this.tasksService.updateTask(parseInt(id, 10), updateFields);
    }

    // Manejar la solicitud HTTP PUT para actualizar el estado de una tarea por ID
    @Put(':id/status')
    updateTaskStatus(@Param('id') id: string, @Body('status') status: TaskStatus): Task {
        return this.tasksService.updateTaskStatus(parseInt(id, 10), status);
    }

    // Manejar la solicitud HTTP DELETE para eliminar una tarea por ID
    @Delete(':id')
    deleteTask(@Param('id') id: string): Task {
        return this.tasksService.deleteTask(parseInt(id, 10));
    }
}
