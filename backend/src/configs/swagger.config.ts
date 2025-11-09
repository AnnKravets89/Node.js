import { OpenAPIV3 } from "openapi-types";
import swaggerUI from "swagger-ui-express";

const swaggerDocument: OpenAPIV3.Document = {
    openapi: "3.0.0",
    info: {
        title: "Pizza Api Documentation",
        version: "1.0.0",
        description: "Api documentation for Pizza Shop",
    },
    servers: [
        {
            url: "http://localhost:7000",
            description: "Local server",
        },
    ],
    tags: [
        {
            name: "Auth",
            description: "Authentication endpoints",
        },
        {
            name: "Pizza",
            description: "Pizza endpoint",
        },
    ],
    paths: {
        "/auth/sign-up": {
            post: {
                tags: ["Auth"],
                summary: "Register new user",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    email: { type: "string", format: "email" },
                                    password: {
                                        type: "string",
                                        format: "password",
                                    },
                                    name: { type: "string" },
                                    surname: { type: "string" },
                                    age: { type: "integer" },
                                },
                                required: [
                                    "email",
                                    "password",
                                    "name",
                                    "surname",
                                    "age",
                                ],
                            },
                        },
                    },
                },
                responses: {
                    "201": {
                        description: "User successfully registered",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        user: {
                                            type: "object",
                                            properties: {
                                                email: { type: "string" },
                                                role: { type: "string" },
                                                name: { type: "string" },
                                                surname: { type: "string" },
                                                age: { type: "integer" },
                                                avatar: { type: "string" },
                                                isActive: { type: "boolean" },
                                                isDeleted: { type: "boolean" },
                                                isVerified: { type: "boolean" },
                                                _id: { type: "string" },
                                                createdAt: { type: "string" },
                                                updatedAt: { type: "string" },
                                            },
                                        },
                                        tokens: {
                                            type: "object",
                                            properties: {
                                                accessToken: { type: "string" },
                                                refreshToken: {
                                                    type: "string",
                                                },
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                    "400": {
                        description: "Bad Request",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "string",
                                            default: 400,
                                        },
                                        message: { type: "string" },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
        "/auth/sign-in": {
            post: {
                tags: ["Auth"],
                summary: "Login user",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    email: { type: "string", format: "email" },
                                    password: {
                                        type: "string",
                                        format: "password",
                                    },
                                },
                                required: ["email", "password"],
                            },
                        },
                    },
                },
                responses: {
                    "200": {
                        description: "User successfully logged in",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        user: {
                                            type: "object",
                                            properties: {
                                                email: { type: "string" },
                                                role: { type: "string" },
                                                name: { type: "string" },
                                                surname: { type: "string" },
                                                age: { type: "integer" },
                                                avatar: { type: "string" },
                                                isActive: { type: "boolean" },
                                                isDeleted: { type: "boolean" },
                                                isVerified: { type: "boolean" },
                                                _id: { type: "string" },
                                                createdAt: { type: "string" },
                                                updatedAt: { type: "string" },
                                            },
                                        },
                                        tokens: {
                                            type: "object",
                                            properties: {
                                                accessToken: { type: "string" },
                                                refreshToken: {
                                                    type: "string",
                                                },
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                    "400": {
                        description: "Bad Request",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "string",
                                            default: 400,
                                        },
                                        message: { type: "string" },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
        "/pizzas": {
            get: {
                tags: ["Pizza"],
                summary: "Get all pizzas with pagination and filters",
                security: [{ bearerAuth: [] }],
                parameters: [
                    {
                        name: "pageSize",
                        in: "query",
                        description: "Number of items per page",
                        schema: { type: "integer", default: 10 },
                    },
                    {
                        name: "page",
                        in: "query",
                        required: true,
                        description: "Page number",
                        schema: { type: "integer", default: 1 },
                    },
                    {
                        name: "name",
                        in: "query",
                        description: "Filter by name of pizza",
                        schema: { type: "string" },
                    },
                    {
                        name: "price",
                        in: "query",
                        description: "Filter by price",
                        schema: { type: "integer" },
                    },
                    {
                        name: "diameter",
                        in: "query",
                        description: "Filter by diameter",
                        schema: { type: "integer" },
                    },
                    {
                        name: "order",
                        in: "query",
                        description: "Sort of items",
                        schema: { type: "string" },
                    },
                ],
                responses: {
                    "200": {
                        description: "List of pizzas with pagination",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        totalItems: { type: "integer" },
                                        totalPages: { type: "integer" },
                                        prevPage: { type: "boolean" },
                                        nextPage: { type: "boolean" },
                                        data: {
                                            type: "array",
                                            items: {
                                                type: "object",
                                                properties: {
                                                    _id: { type: "string" },
                                                    name: { type: "string" },
                                                    price: { type: "integer" },
                                                    diameter: {
                                                        type: "integer",
                                                    },
                                                },
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
    },
    components: {
        securitySchemes: {
            bearerAuth: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT",
            },
        },
    },
};

export { swaggerDocument, swaggerUI };
