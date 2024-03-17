<?php

namespace App\ApiResource;

use ApiPlatform\OpenApi\Factory\OpenApiFactoryInterface;
use ApiPlatform\OpenApi\OpenApi;
use ApiPlatform\OpenApi\Model;

final class OpenApiFactory implements OpenApiFactoryInterface
{
    public function __construct(
        private OpenApiFactoryInterface $decorated
    ) {
    }

    public function __invoke(array $context = []): OpenApi
    {
        $openApi = $this->decorated->__invoke($context);
        $schemas = $openApi->getComponents()->getSchemas();

        /** Schemas Auth */

        $schemas['Auth'] = new \ArrayObject([
            'type' => 'object',
            'properties' => [
                'token' => [
                    'type' => 'string',
                    'readOnly' => true,
                    'nullable' => false,
                ],
            ],
            'required' => ['token'],
        ]);
        $schemas['Credentials'] = new \ArrayObject([
            'type' => 'object',
            'properties' => [
                'username' => [
                    'type' => 'string',
                    'example' => 'string',
                ],
                'password' => [
                    'type' => 'string',
                    'example' => 'string',
                ],
            ],
            'required' => ['properties'],
        ]);

        /** Schemas Verify */

        $schemas['Token'] = new \ArrayObject([
            'type' => 'object',
            'properties' => [
                'token' => [
                    'type' => 'string',
                    'nullable' => false,
                ],
            ],
            'required' => ['token'],
        ]);
        $schemas['TokenStatus'] = new \ArrayObject([
            'type' => 'object',
            'properties' => [
                'tokenStatus' => [
                    'type' => 'string',
                    'example' => 'string',
                ],
            ],
            'required' => ['properties'],
        ]);

        /** Schemas Get This Admin Account By Username */

        $schemas['Username'] = new \ArrayObject([
            'type' => 'object',
            'properties' => [
                'username' => [
                    'type' => 'string',
                    'nullable' => false,
                ],
            ],
            'required' => ['username'],
        ]);
        $schemas['ThisAdminAccountData'] = new \ArrayObject([
            'type' => 'object',
            'properties' => [
                'id' => [
                    'type' => 'integer',
                    'example' => 'integer',
                ],
                'username' => [
                    'type' => 'string',
                    'example' => 'string',
                ],
                'email' => [
                    'type' => 'string',
                    'example' => 'string',
                ],
                'superadmin' => [
                    'type' => 'boolean',
                    'example' => true,
                ],
            ],
            'required' => ['properties'],
        ]);

        /** Schemas Get This Page By Route */

        $schemas['Route'] = new \ArrayObject([
            'type' => 'object',
            'properties' => [
                'route' => [
                    'type' => 'string',
                    'nullable' => false,
                ],
            ],
            'required' => ['route'],
        ]);
        $schemas['ThisPageData'] = new \ArrayObject([
            'type' => 'object',
            'properties' => [
                'route' => [
                    'type' => 'string',
                    'example' => 'string',
                ],
                'content' => [
                    'type' => 'string',
                    'example' => 'string',
                ],
            ],
            'required' => ['properties'],
        ]);

        /** Schemas Not Found */

        $schemas['NotFound'] = new \ArrayObject([
            'type' => 'string',
            'example' => 'string',
        ]);

        $schemas = $openApi->getComponents()->getSecuritySchemes() ?? [];
        $schemas['JWT'] = new \ArrayObject([
            'type' => 'http',
            'scheme' => 'bearer',
            'bearerFormat' => 'JWT',
        ]);

        /** Path Auth */

        $pathItem = new Model\PathItem(
            ref: 'JWT Token',
            post: new Model\Operation(
                operationId: 'postCredentialsItem',
                tags: ['Auth'],
                description: 'Create a user token.',
                responses: [
                    '200' => [
                        'description' => 'User token created',
                        'content' => [
                            'application/json' => [
                                'schema' => [
                                    '$ref' => '#/components/schemas/Auth',
                                ],
                            ],
                        ],
                    ],
                ],
                summary: 'Create a user token.',
                requestBody: new Model\RequestBody(
                    description: 'The login data',
                    content: new \ArrayObject([
                        'application/json' => [
                            'schema' => [
                                '$ref' => '#/components/schemas/Credentials',
                            ],
                        ],
                    ]),
                    required: true
                ),
                security: [],
            ),
        );
        $openApi->getPaths()->addPath('/auth', $pathItem);

        /** Path Verify */

        $pathItemVerify = new Model\PathItem(
            ref: 'JWT Token',
            post: new Model\Operation(
                operationId: 'postTokenItem',
                tags: ['Auth'],
                description: 'Used to verify a token.',
                responses: [
                    '200' => [
                        'description' => 'Token verified',
                        'content' => [
                            'application/json' => [
                                'schema' => [
                                    '$ref' => '#/components/schemas/TokenStatus',
                                ],
                            ],
                        ],
                    ],
                ],
                summary: 'Used to verify a token.',
                requestBody: new Model\RequestBody(
                    description: 'The token data',
                    content: new \ArrayObject([
                        'application/json' => [
                            'schema' => [
                                '$ref' => '#/components/schemas/Token',
                            ],
                        ],
                    ]),
                    required: true
                ),
                security: [],
            ),
        );
        $openApi->getPaths()->addPath('/verify', $pathItemVerify);

        /** Path get admin account by username */

        $pathItemVerify = new Model\PathItem(
            ref: 'Admin Account',
            get: new Model\Operation(
                operationId: 'getThisAdminAccount',
                tags: ['AdminAccount'],
                description: 'Retrieves a AdminAccount resource by username.',
                responses: [
                    '200' => [
                        'description' => 'AdminAccount resource',
                        'content' => [
                            'application/json' => [
                                'schema' => [
                                    '$ref' => '#/components/schemas/ThisAdminAccountData',
                                ],
                            ],
                        ],
                    ],
                    '404' => [
                        'description' => 'Resource not found',
                        'content' => [
                            'application/json' => [
                                'schema' => [
                                    '$ref' => '#/components/schemas/NotFound',
                                ],
                            ],
                        ],
                    ],
                ],
                summary: 'Retrieves a AdminAccount resource by username.',
                parameters: [new Model\Parameter(
                    in: 'path',
                    name: 'username',
                    description: 'AdminAccount identifier',
                    required: true,
                    schema: [
                        'type' => 'string',
                    ],
                )],
                security: [],
            ),
        );
        $openApi->getPaths()->addPath('/api/admin_accounts/getAdminAccountByUsername/{username}', $pathItemVerify);

        /** Path get page by route */

        $pathItemVerify = new Model\PathItem(
            ref: 'Page',
            get: new Model\Operation(
                operationId: 'getThisPage',
                tags: ['Page'],
                description: 'Retrieves a page resource by route.',
                responses: [
                    '200' => [
                        'description' => 'Page resource',
                        'content' => [
                            'application/json' => [
                                'schema' => [
                                    '$ref' => '#/components/schemas/ThisPageData',
                                ],
                            ],
                        ],
                    ],
                    '404' => [
                        'description' => 'Resource not found',
                        'content' => [
                            'application/json' => [
                                'schema' => [
                                    '$ref' => '#/components/schemas/NotFound',
                                ],
                            ],
                        ],
                    ],
                ],
                summary: 'Retrieves a page resource by route.',
                parameters: [new Model\Parameter(
                    in: 'path',
                    name: 'route',
                    description: 'Page identifier',
                    required: true,
                    schema: [
                        'type' => 'string',
                    ],
                )],
                security: [],
            ),
        );
        $openApi->getPaths()->addPath('/api/pages/getPageByRoute/{route}', $pathItemVerify);


        return $openApi;
    }
}
