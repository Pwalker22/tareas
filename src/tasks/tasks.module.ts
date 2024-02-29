/* eslint-disable prettier/prettier */  // Disable eslint formatting for this file

// Import necessary modules from the NestJS framework
import { Module } from '@nestjs/common';

// Import the TasksController and TasksService classes
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

// Define a module class using the Module decorator
@Module({
  // Specify the controllers that belong to this module (TasksController)
  controllers: [TasksController],
  
  // Specify the providers (services) that belong to this module (TasksService)
  providers: [TasksService],
})
export class TasksModule {}
