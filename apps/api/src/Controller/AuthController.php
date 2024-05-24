<?php

// api/src/Controller/AuthController.php

namespace App\Controller;

use Lexik\Bundle\JWTAuthenticationBundle\Encoder\JWTEncoderInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Exception\JWTDecodeFailureException;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWSProvider\JWSProviderInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\Routing\Annotation\Route;

#[AsController]
class AuthController extends AbstractController
{
    public $jwsProvider;
    public $jwtManager;
    public $jwtEncoder;

    public function __construct(JWSProviderInterface $jwsProvider, JWTTokenManagerInterface $jwtManager, JWTEncoderInterface $jwtEncoder)
    {
        $this->jwsProvider = $jwsProvider;
        $this->jwtManager = $jwtManager;
        $this->jwtEncoder = $jwtEncoder;
    }

    #[Route(
        name: 'logout',
        path: '/logout',
        methods: ['POST'],
    )]
    public function logout()
    {
        if (isset($_COOKIE['PHPSESSID'])) {
            unset($_COOKIE['PHPSESSID']);
            setcookie('PHPSESSID', '', time() - 3600, '/');
        }
        if (isset($_COOKIE['BEARER'])) {
            unset($_COOKIE['BEARER']);
            setcookie('BEARER', '', time() - 3600, '/');
        }

        return new JsonResponse(
            [
                'logoutStatus' => true,
            ]
        );
    }

    #[Route(
        name: 'verify',
        path: '/verify',
        methods: ['GET'],
    )]
    public function verify()
    {
        return new JsonResponse(
            [
                'test' => 'test',
            ]
        );
        /*
        $parameters = json_decode($request->getContent(), true);

        try {
            if ($this->jwtEncoder->decode($parameters['token'])) {
                return new JsonResponse(
                    [
                        'tokenStatus' => 'valid'
                    ]
                );
            }
        } catch (JWTDecodeFailureException $e) {
            if (JWTDecodeFailureException::EXPIRED_TOKEN === $e->getReason()) {
                return new JsonResponse(
                    [
                        'tokenStatus' => 'expired'
                    ]
                );
            }
            if (JWTDecodeFailureException::INVALID_TOKEN === $e->getReason()) {
                return new JsonResponse(
                    [
                        'tokenStatus' => 'invalid'
                    ]
                );
            }
            if (JWTDecodeFailureException::UNVERIFIED_TOKEN === $e->getReason()) {
                return new JsonResponse(
                    [
                        'tokenStatus' => 'unverified'
                    ]
                );
            }
        }
        */
    }
}
