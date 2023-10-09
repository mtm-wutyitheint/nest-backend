/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

export class CorsConfig {

    configure(): CorsOptions {
      return {
        origin: 'http://localhost:3001', // Allow requests from this origin
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true, // Allow credentials (e.g., cookies)
      };
    }
  }

@Module({
  providers: [
    {
      provide: APP_GUARD,
      useClass: CorsConfig,
    },
  ],
})
export class CorsModule {}


