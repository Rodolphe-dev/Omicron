<?php
// api/src/Controller/AuthController.php
namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;

use Lexik\Bundle\JWTAuthenticationBundle\Services\JWSProvider\JWSProviderInterface;

use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Exception\JWTDecodeFailureException;
use Lexik\Bundle\JWTAuthenticationBundle\Encoder\JWTEncoderInterface;

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
        name: 'verify',
        path: '/verify',
        methods: ['POST'],
    )]
    public function verify(Request $request)
    {
        //$token = $request->get('token');

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
    }
}
