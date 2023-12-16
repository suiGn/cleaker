// src/index.js
import express from 'express';
import { subdomainHandler } from './handlers/subdomainHandler.js';
import { userProfileRoutes } from './routes/userProfileRoutes.js';

/**
 * Initializes and configures the cleaker server functionalities.
 * @module cleaker
 * @param {Object} app - The Express application instance.
 */


export default function configureCleaker(app) {
    app.use(subdomainHandler);
    userProfileRoutes(app);
}