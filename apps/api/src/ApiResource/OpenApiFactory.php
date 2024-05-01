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
                    'example' => 'admin',
                ],
                'password' => [
                    'type' => 'string',
                    'example' => 'password',
                ],
            ],
            'required' => ['properties'],
        ]);

        /** Schemas Logout */

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

        /** Schemas Update Navbar Status */

        $schemas['Id'] = new \ArrayObject([
            'type' => 'object',
            'properties' => [
                'id' => [
                    'type' => 'string',
                    'nullable' => false,
                ],
            ],
            'required' => ['id'],
        ]);
        $schemas['Navbar-user.create_user.update'] = new \ArrayObject([
            'type' => 'object',
            'properties' => [
                'name' => [
                    'type' => 'string',
                    'example' => 'string',
                ],
                'status' => [
                    'type' => 'boolean',
                    'example' => 'true',
                ],
                'items' => [
                    'type' => 'string',
                    'example' => 'string',
                ],
            ],
            'required' => ['properties'],
        ]);

        /** Schemas Update Sidebar Status */

        $schemas['Id'] = new \ArrayObject([
            'type' => 'object',
            'properties' => [
                'id' => [
                    'type' => 'string',
                    'nullable' => false,
                ],
            ],
            'required' => ['id'],
        ]);
        $schemas['Sidebar-user.create_user.update'] = new \ArrayObject([
            'type' => 'object',
            'properties' => [
                'name' => [
                    'type' => 'string',
                    'example' => 'string',
                ],
                'status' => [
                    'type' => 'boolean',
                    'example' => 'true',
                ],
                'items' => [
                    'type' => 'string',
                    'example' => 'string',
                ],
            ],
            'required' => ['properties'],
        ]);

        /** Schemas Update Footer Status */

        $schemas['Id'] = new \ArrayObject([
            'type' => 'object',
            'properties' => [
                'id' => [
                    'type' => 'string',
                    'nullable' => false,
                ],
            ],
            'required' => ['id'],
        ]);
        $schemas['Footer-user.create_user.update'] = new \ArrayObject([
            'type' => 'object',
            'properties' => [
                'name' => [
                    'type' => 'string',
                    'example' => 'string',
                ],
                'status' => [
                    'type' => 'boolean',
                    'example' => 'true',
                ],
                'content' => [
                    'type' => 'string',
                    'example' => 'string',
                ],
            ],
            'required' => ['properties'],
        ]);

        /** Schemas Front Data */

        $schemas['Front-data'] = new \ArrayIterator([
            'type' => 'object',
            'properties' => [
                'navbar' => [
                    'type' => 'object',
                    'properties' => [
                        'name' => [
                            'type' => 'string',
                            'example' => 'string',
                        ],
                        'status' => [
                            'type' => 'boolean',
                            'example' => true,
                        ],
                        'items' => [
                            'type' => 'string',
                            'example' => 'string',
                        ]
                    ],
                ],
                'sidebar' => [
                    'type' => 'object',
                    'properties' => [
                        'name' => [
                            'type' => 'string',
                            'example' => 'string',
                        ],
                        'status' => [
                            'type' => 'boolean',
                            'example' => true,
                        ],
                        'items' => [
                            'type' => 'string',
                            'example' => 'string',
                        ]
                    ],
                ],
                'footer' => [
                    'type' => 'object',
                    'properties' => [
                        'name' => [
                            'type' => 'string',
                            'example' => 'string',
                        ],
                        'status' => [
                            'type' => 'boolean',
                            'example' => true,
                        ],
                        'content' => [
                            'type' => 'string',
                            'example' => 'string',
                        ]
                    ],
                ],
                'setting' => [
                    'type' => 'object',
                    'properties' => [
                        'nameApp' => [
                            'type' => 'string',
                            'example' => 'string',
                        ],
                        'statusMaintenance' => [
                            'type' => 'boolean',
                            'example' => true,
                        ]
                    ],
                ],
                'page' => [
                    'type' => 'object',
                    'properties' => [
                        'name' => [
                            'type' => 'string',
                            'example' => 'string',
                        ],
                        'route' => [
                            'type' => 'string',
                            'example' => 'string',
                        ],
                        'content' => [
                            'type' => 'string',
                            'example' => 'string',
                        ]
                    ],
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
        $schemas['cookieAuth'] = new \ArrayObject([
            'type' => 'apiKey',
            'in' => 'cookie',
            'name' => 'BEARER',
        ]);

        /** Path Auth */

        $pathAuthItem = new Model\PathItem(
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
        $openApi->getPaths()->addPath('/auth', $pathAuthItem);

        /** Path Logout */

        $pathItemLogout = new Model\PathItem(
            ref: 'JWT Token',
            post: new Model\Operation(
                operationId: 'logoutItem',
                tags: ['Auth'],
                description: 'Used to logout.',
                responses: [
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
                security: [],
            ),
        );
        $openApi->getPaths()->addPath('/logout', $pathItemLogout);

        /** Path Verify */

        $pathItemVerify = new Model\PathItem(
            ref: 'JWT Token',
            get: new Model\Operation(
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
                security: [],
            ),
        );

        $openApi->getPaths()->addPath('/verify', $pathItemVerify);

        /** Path get admin account by username */

        $pathItemGetAdminUsername = new Model\PathItem(
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
        $openApi->getPaths()->addPath('/api/admin_accounts/getAdminAccountByUsername/{username}', $pathItemGetAdminUsername);

        /** Path get page by route */

        $pathItemPageRoute = new Model\PathItem(
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
        $openApi->getPaths()->addPath('/api/pages/getPageByRoute/{route}', $pathItemPageRoute);

        /** Path update navbar status */

        $pathItemNavbarStatus = new Model\PathItem(
            ref: 'Navbar',
            patch: new Model\Operation(
                operationId: 'updateNavbarStatus',
                tags: ['Navbar'],
                description: 'Update a navbar status.',
                responses: [
                    '200' => [
                        'description' => 'Navbar resource',
                        'content' => [
                            'application/json' => [
                                'schema' => [
                                    '$ref' => '#/components/schemas/Navbar-user.create_user.update',
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
                summary: 'Update a navbar status.',
                parameters: [new Model\Parameter(
                    in: 'path',
                    name: 'id',
                    description: 'Navbar identifier',
                    required: true,
                    schema: [
                        'type' => 'string',
                    ],
                )],
                security: [],
            ),
        );
        $openApi->getPaths()->addPath('/api/navbars/updateNavbarStatus/{id}', $pathItemNavbarStatus);

        /** Path update sidebar status */

        $pathItemSidebarStatus = new Model\PathItem(
            ref: 'Sidebar',
            patch: new Model\Operation(
                operationId: 'updateSidebarStatus',
                tags: ['Sidebar'],
                description: 'Update a sidebar status.',
                responses: [
                    '200' => [
                        'description' => 'Sidebar resource',
                        'content' => [
                            'application/json' => [
                                'schema' => [
                                    '$ref' => '#/components/schemas/Sidebar-user.create_user.update',
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
                summary: 'Update a sidebar status.',
                parameters: [new Model\Parameter(
                    in: 'path',
                    name: 'id',
                    description: 'Sidebar identifier',
                    required: true,
                    schema: [
                        'type' => 'string',
                    ],
                )],
                security: [],
            ),
        );
        $openApi->getPaths()->addPath('/api/sidebars/updateSidebarStatus/{id}', $pathItemSidebarStatus);

        /** Path update footer status */

        $pathItemFooterStatus = new Model\PathItem(
            ref: 'Footer',
            patch: new Model\Operation(
                operationId: 'updateSidebarStatus',
                tags: ['Footer'],
                description: 'Update a footer status.',
                responses: [
                    '200' => [
                        'description' => 'Footer resource',
                        'content' => [
                            'application/json' => [
                                'schema' => [
                                    '$ref' => '#/components/schemas/Footer-user.create_user.update',
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
                summary: 'Update a footer status.',
                parameters: [new Model\Parameter(
                    in: 'path',
                    name: 'id',
                    description: 'Footer identifier',
                    required: true,
                    schema: [
                        'type' => 'string',
                    ],
                )],
                security: [],
            ),
        );
        $openApi->getPaths()->addPath('/api/footers/updateFooterStatus/{id}', $pathItemFooterStatus);

        /** Path get front data */

        $pathItemFrontData = new Model\PathItem(
            ref: 'Front-data',
            get: new Model\Operation(
                operationId: 'getFrontData',
                tags: ['Front-data'],
                description: 'Retrieve all data for the front.',
                responses: [
                    '200' => [
                        'description' => 'Front ressource',
                        'content' => [
                            'application/json' => [
                                'schema' => [
                                    '$ref' => '#/components/schemas/Front-data',
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
                summary: 'Retrieve all data for the front.',
                security: [],
            ),
        );
        $openApi->getPaths()->addPath('/api/frontdata/getFrontData', $pathItemFrontData);


        return $openApi;
    }
}
