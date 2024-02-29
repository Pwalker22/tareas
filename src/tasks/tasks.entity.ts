/* eslint-disable prettier/prettier */  // Deshabilitar el formateo de eslint para este archivo

// Define una clase que representa una entidad de tarea (Task)
export class Task {
    // ID de la tarea
    id: number;

    // Un campo adicional para almacenar el ID original antes de las actualizaciones
    updatedId: number;

    // Título de la tarea
    title: string;

    // Descripción de la tarea
    description: string;

    // Estado de la tarea, utilizando el enum TaskStatus
    status: TaskStatus;
}

// Define un enum que representa los posibles estados de la tarea
export enum TaskStatus {
    // La tarea está pendiente
    PENDING = 'PENDIENTE',

    // La tarea está en progreso
    IN_PROGRESS = "EN_PROGRESO",

    // La tarea está completada
    DONE = "COMPLETADA",
}
