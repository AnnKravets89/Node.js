import { OpenAPIV3 } from "openapi-types";
import swaggerUi from "swagger-ui-express";

const swaggerDocument: OpenAPIV3.Document = {
  openapi: "3.0.3",
  info: {
    title: "Express API",
    version: "1.0.0",
    description: "API documentation for authentication and users",
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Local server",
    },
  ],
  tags: [
    {
      name: "auth",
      description: "Authentication endpoints",
    },
    {
      name: "user",
      description: "User endpoints",
    },
  ],
  paths: {
    "/auth/sign-up": {
      post: {
        tags: ["auth"],
        summary: "Register new user",
        description: "Creates a new user account in the system",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/SignUpRequest",
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
                  $ref: "#/components/schemas/UserResponse",
                },
              },
            },
          },
          "400": {
            description: "Bad Request",
          },
          "409": {
            description: "Email already in use",
          },
        },
      },
    },
    "/auth/sign-in": {
      post: {
        tags: ["auth"],
        summary: "Login user",
        description: "Only registered users can log in",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/LoginRequest",
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
                  $ref: "#/components/schemas/UserResponse",
                },
              },
            },
          },
          "400": {
            description: "Invalid credentials",
          },
          "404": {
            description: "User not found",
          },
        },
      },
    },
    "/auth/refresh": {
      post: {
        tags: ["auth"],
        summary: "Refresh access token",
        description:
          "Generates new access & refresh tokens using a valid refresh token",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/RefreshRequest",
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Tokens successfully refreshed",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/TokensResponse",
                },
              },
            },
          },
          "401": {
            description: "Invalid or expired refresh token",
          },
        },
      },
    },
    "/auth/logout": {
      post: {
        tags: ["auth"],
        summary: "Logs out user",
        description: "Logs out from current user session",
        security: [{ bearerAuth: [] }],
        responses: {
          "204": {
            description: "User successfully logged out (no content)",
          },
          "401": {
            description: "Invalid or expired access token",
          },
        },
      },
    },
    "/auth/logout/all": {
      post: {
        tags: ["auth"],
        summary: "Logout user globally",
        description:
          "Revokes the refresh token and logs out the user from all sessions",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/RefreshRequest",
              },
            },
          },
        },
        responses: {
          "204": {
            description: "User successfully logged out (token revoked)",
          },
          "401": {
            description: "Invalid or expired access token",
          },
        },
      },
    },
    "/auth/forgot-password": {
      post: {
        tags: ["auth"],
        summary: "Forgot password",
        description: "Sends a recovery email with an action token",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["email"],
                properties: {
                  email: {
                    type: "string",
                    format: "email",
                  },
                },
              },
            },
          },
        },
        responses: {
          "204": {
            description: "Recovery email sent successfully (no content)",
          },
          "404": {
            description: "User not found",
          },
        },
      },
    },
    "/auth/forgot-password/recover": {
      post: {
        tags: ["auth"],
        summary: "Reset password",
        description: "Resets password using the provided action token",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/RecoveryPassword",
              },
            },
          },
        },
        responses: {
          "204": {
            description: "Password updated successfully (no content)",
          },
          "400": {
            description: "Invalid request data",
          },
          "401": {
            description: "Token is not valid",
          },
          "410": {
            description: "Action token expired",
          },
        },
      },
    },
    "/auth/change-password": {
      post: {
        tags: ["auth"],
        summary: "Change password",
        description: "Allows an authenticated user to change their password",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ChangePassword",
              },
            },
          },
        },
        responses: {
          "204": {
            description: "Password changed successfully (no content)",
          },
          "400": {
            description: "Invalid request data",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorResponse",
                },
              },
            },
          },
          "401": {
            description: "Invalid or expired access token",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorResponse",
                },
              },
            },
          },
        },
      },
    },
    "/auth/verify": {
      post: {
        tags: ["auth"],
        summary: "Send verification email",
        description: "Sends an action token to user's email for verification",
        security: [{ bearerAuth: [] }],
        responses: {
          "204": {
            description: "Verify email sent successfully (no content)",
          },
          "401": {
            description: "Invalid or expired access token",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorResponse",
                },
              },
            },
          },
          "404": {
            description: "User not found",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorResponse",
                },
              },
            },
          },
        },
      },
    },
    "/users/me": {
      get: {
        tags: ["user"],
        summary: "Get current user",
        description: "Returns the authenticated user's profile",
        security: [{ bearerAuth: [] }],
        responses: {
          "200": {
            description: "Successfully retrieved current user",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/PrivateUserResponse",
                },
              },
            },
          },
          "401": {
            description: "Invalid or expired access token",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorResponse",
                },
              },
            },
          },
          "404": {
            description: "User not found",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorResponse",
                },
              },
            },
          },
        },
      },
      patch: {
        tags: ["user"],
        summary: "Update current user",
        description: "Updates and returns current user profile",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/UpdateUserDTO",
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Successfully updated current user",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/PrivateUserResponse",
                },
              },
            },
          },
          "400": {
            description: "Invalid request data",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorResponse",
                },
              },
            },
          },
          "401": {
            description: "Invalid or expired access token",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorResponse",
                },
              },
            },
          },
          "404": {
            description: "User not found",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorResponse",
                },
              },
            },
          },
        },
      },
      delete: {
        tags: ["user"],
        summary: "Delete current user",
        description: "Allows authenticated user to delete their own profile",
        security: [{ bearerAuth: [] }],
        responses: {
          "204": {
            description: "Successfully deleted current user (no content)",
          },
          "401": {
            description: "Invalid or expired access token",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorResponse",
                },
              },
            },
          },
          "409": {
            description: "User already deleted",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorResponse",
                },
              },
            },
          },
        },
      },
    },
  },
  components: {
    schemas: {
      SignUpRequest: {
        type: "object",
        properties: {
          name: { type: "string" },
          age: { type: "integer" },
          phone: { type: "string" },
          email: {
            type: "string",
            format: "email",
          },
          password: {
            type: "string",
            format: "password",
          },
        },
        required: ["name", "age", "email", "password"],
      },
      LoginRequest: {
        type: "object",
        properties: {
          email: {
            type: "string",
            format: "email",
          },
          password: {
            type: "string",
            format: "password",
          },
        },
        required: ["email", "password"],
      },
      UserResponse: {
        type: "object",
        properties: {
          user: {
            type: "object",
            properties: {
              _id: {
                type: "string",
                format: "uuid",
              },
              name: { type: "string" },
              age: { type: "integer" },
              email: {
                type: "string",
                format: "email",
              },
              phone: { type: "string" },
              role: {
                type: "string",
                enum: ["user", "admin"],
              },
              isVerified: { type: "boolean" },
              isDeleted: { type: "boolean" },
              avatar: {
                type: "string",
                nullable: true,
              },
              createdAt: { type: "string" },
              updatedAt: { type: "string" },
            },
          },
          tokens: {
            type: "object",
            properties: {
              accessToken: {
                type: "string",
                format: "jwt",
              },
              refreshToken: {
                type: "string",
                format: "jwt",
              },
            },
          },
        },
      },
      PrivateUserResponse: {
        type: "object",
        properties: {
          _id: {
            type: "string",
          },
          name: { type: "string" },
          age: { type: "integer" },
          email: {
            type: "string",
            format: "email",
          },
          phone: { type: "string" },
          role: {
            type: "string",
            enum: ["user", "admin"],
          },
          isVerified: { type: "boolean" },
          isDeleted: { type: "boolean" },
          avatar: {
            type: "string",
            nullable: true,
          },
          createdAt: { type: "string" },
          updatedAt: { type: "string" },
        },
      },
      UpdateUserDTO: {
        type: "object",
        properties: {
          name: { type: "string" },
          age: { type: "integer" },
          phone: { type: "string" },
        },
      },
      RefreshRequest: {
        type: "object",
        required: ["refreshToken"],
        properties: {
          refreshToken: {
            type: "string",
            format: "jwt",
          },
        },
      },
      TokensResponse: {
        type: "object",
        required: ["accessToken", "refreshToken"],
        properties: {
          accessToken: {
            type: "string",
            format: "jwt",
          },
          refreshToken: {
            type: "string",
            format: "jwt",
          },
        },
      },
      RecoveryPassword: {
        type: "object",
        required: ["actionToken", "password"],
        properties: {
          actionToken: {
            type: "string",
            description: "Action token received from email",
            format: "jwt",
          },
          password: {
            type: "string",
            format: "password",
          },
        },
      },
      ChangePassword: {
        type: "object",
        required: ["password", "oldPassword"],
        properties: {
          password: {
            type: "string",
            format: "password",
            minLength: 8,
          },
          oldPassword: {
            type: "string",
            format: "password",
          },
        },
      },
      ErrorResponse: {
        type: "object",
        required: ["status", "message"],
        properties: {
          status: {
            type: "integer",
            description: "HTTP status code",
            example: 400,
          },
          message: {
            type: "string",
            description: "Human-friendly error description",
            example: "Validation failed",
          },
          errors: {
            type: "array",
            description:
              "Detailed list of field or business validation errors (optional)",
            items: {
              type: "string",
              example: ["email must be a valid email", "password is required"],
            },
          },
          timestamp: {
            type: "string",
            format: "date-time",
            description: "Server time of error generation",
            example: "2025-01-23T17:42:10.928Z",
          },
          path: {
            type: "string",
            description: "URL path of the request where error happened",
            example: "/auth/sign-in",
          },
        },
      },
    },
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
};

export { swaggerDocument, swaggerUi };
