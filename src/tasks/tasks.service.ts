/* eslint-disable prettier/prettier */  // Deshabilitar el formateo de eslint para este archivo

// Importar los módulos necesarios del framework NestJS
import { Injectable, NotFoundException } from '@nestjs/common';

// Importar los tipos Task y TaskStatus desde el archivo tasks.entity
import { Task, TaskStatus } from './tasks.entity';

// Definir una clase de servicio usando el decorador Injectable
@Injectable()
export class TasksService {
    // Array privado para almacenar tareas
    private tasks: Task[] = [];

    // Obtener todas las tareas
    getAllTasks(): Task[] {
        return this.tasks;
    }

    // Obtener una tarea por su ID
    getTaskById(id: number): Task {
        // Encontrar la tarea por su ID o updatedId
        let task = this.tasks.find(task => task.id === id);

        // Si no se encuentra la tarea por ID, intentar encontrarla por updatedId
        if (!task) {
            task = this.tasks.find(task => task.updatedId === id);
        }

        // Si la tarea aún no se encuentra, lanzar una NotFoundException
        if (!task) {
            throw new NotFoundException(`Task with ID ${id} not found`);
        }

        // Devolver la tarea encontrada
        return task;
    }

    // Crear una nueva tarea con el título, descripción y estado proporcionados
    createTask(title: string, description: string, status: TaskStatus = TaskStatus.IN_PROGRESS): Task {
        const task: Task = {
            // Asignar un ID único a la tarea
            id: this.tasks.length + 1,
            // Establecer updatedId inicialmente al mismo valor que el ID
            updatedId: this.tasks.length + 1,
            title,
            description,
            status,
        };
        // Agregar la nueva tarea al array de tareas
        this.tasks.push(task);
        // Devolver la tarea creada
        return task;
    }

    // Actualizar una tarea con el ID proporcionado y los nuevos valores de los campos
    updateTask(id: number, updateFields: { title?: string; description?: string; status?: TaskStatus }): Task {
        // Encontrar el índice de la tarea en el array de tareas
        const taskIndex = this.tasks.findIndex(task => task.id === id);

        // Si se encuentra la tarea, actualizar sus campos
        if (taskIndex !== -1) {
            // Actualizar el campo updatedId al valor original del ID
            this.tasks[taskIndex].updatedId = this.tasks[taskIndex].id;
            // Actualizar los demás campos usando la sintaxis de propagación (spread syntax)
            this.tasks[taskIndex] = { ...this.tasks[taskIndex], ...updateFields };
            // Devolver la tarea actualizada
            return this.tasks[taskIndex];
        } else {
            // Si no se encuentra la tarea, lanzar una NotFoundException
            throw new NotFoundException(`Task with ID ${id} not found`);
        }
    }

    // Actualizar el estado de una tarea con el ID proporcionado
    updateTaskStatus(id: number, status: TaskStatus): Task {
        // Encontrar el índice de la tarea en el array de tareas
        const taskIndex = this.tasks.findIndex(task => task.id === id);

        // Si se encuentra la tarea, actualizar su estado
        if (taskIndex !== -1) {
            this.tasks[taskIndex].status = status;
            // Devolver la tarea actualizada
            return this.tasks[taskIndex];
        } else {
            // Si no se encuentra la tarea, lanzar una NotFoundException
            throw new NotFoundException(`Task with ID ${id} not found`);
        }
    }

    // Eliminar una tarea con el ID proporcionado
    deleteTask(id: number): Task {
        // Encontrar el índice de la tarea en el array de tareas
        const taskIndex = this.tasks.findIndex(task => task.id === id);

        // Si se encuentra la tarea, eliminarla del array y devolverla
        if (taskIndex !== -1) {
            const deletedTask = this.tasks.splice(taskIndex, 1)[0];
            return deletedTask;
        } else {
            // Si no se encuentra la tarea, lanzar una NotFoundException
            throw new NotFoundException(`Task with ID ${id} not found`);
        }
    }
}
