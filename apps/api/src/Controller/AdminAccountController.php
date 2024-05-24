<?php

// api/src/Controller/AdminAccountController.php

namespace App\Controller;

use App\Entity\AdminAccount;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\Routing\Annotation\Route;

#[AsController]
class AdminAccountController extends AbstractController
{
    public function __construct()
    {
    }

    #[Route(
        name: 'getAdminAccountByUsername',
        path: '/api/admin_accounts/getAdminAccountByUsername/{username}',
        methods: ['GET'],
    )]
    public function getAdminAccountByUsername($username, EntityManagerInterface $entityManager)
    {
        $adminAccount = $entityManager->getRepository(AdminAccount::class)->findOneBy(['username' => $username]);

        return new JsonResponse(
            [
                'id' => $adminAccount->getId(),
                'username' => $adminAccount->getUsername(),
                'email' => $adminAccount->getEmail(),
                'superadmin' => $adminAccount->isSuperadmin(),
            ]
        );
    }
}
