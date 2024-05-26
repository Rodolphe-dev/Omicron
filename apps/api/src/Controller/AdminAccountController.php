<?php

// api/src/Controller/AdminAccountController.php

namespace App\Controller;

use App\Entity\AdminAccount;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

#[AsController]
class AdminAccountController extends AbstractController
{
    public function __construct(private readonly UserPasswordHasherInterface $passwordHasher)
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

        if (!$adminAccount) {
            throw $this->createNotFoundException('No admin account found for this username : '.$username);
        }

        return new JsonResponse(
            [
                'id' => $adminAccount->getId(),
                'username' => $adminAccount->getUsername(),
                'email' => $adminAccount->getEmail(),
                'superadmin' => $adminAccount->isSuperadmin(),
            ]
        );
    }

    #[Route(
        name: 'updateProfile',
        path: '/api/admin_accounts/updateProfile/{id}',
        methods: ['PATCH'],
    )]
    public function updateProfile($id, EntityManagerInterface $entityManager, Request $request)
    {
        $adminAccount = $entityManager->getRepository(AdminAccount::class)->find($id);

        if (!$adminAccount) {
            throw $this->createNotFoundException('No admin account found for this id : '.$id);
        }

        $data = json_decode($request->getContent(), false);

        $adminAccount->setUsername($data->username);
        $adminAccount->setEmail($data->email);
        $adminAccount->isSuperadmin($data->superadmin);

        $entityManager->flush();

        return new JsonResponse(
            [
                'id' => $adminAccount->getId(),
                'username' => $adminAccount->getUsername(),
                'email' => $adminAccount->getEmail(),
                'superadmin' => $adminAccount->isSuperadmin(),
            ]
        );
    }

    #[Route(
        name: 'updatePassword',
        path: '/api/admin_accounts/updatePassword/{id}',
        methods: ['PATCH'],
    )]
    public function updatePassword($id, EntityManagerInterface $entityManager, Request $request)
    {
        $adminAccount = $entityManager->getRepository(AdminAccount::class)->find($id);

        if (!$adminAccount) {
            throw $this->createNotFoundException('No admin account found for this id : '.$id);
        }

        $data = json_decode($request->getContent(), false);

        $hashedPassword = $this->passwordHasher->hashPassword(
            $adminAccount,
            $data->plainPassword
        );
        $adminAccount->setPassword($hashedPassword);
        $entityManager->flush();

        return new JsonResponse(
            [
                'id' => $adminAccount->getId(),
                'username' => $adminAccount->getUsername(),
                'email' => $adminAccount->getEmail(),
                'superadmin' => $adminAccount->isSuperadmin(),
            ]
        );
    }

    #[Route(
        name: 'updateMyPassword',
        path: '/api/admin_accounts/updateMyPassword/{id}',
        methods: ['PATCH'],
    )]
    public function updateMyPassword($id, EntityManagerInterface $entityManager, Request $request)
    {
        $adminAccount = $entityManager->getRepository(AdminAccount::class)->find($id);

        if (!$adminAccount) {
            throw $this->createNotFoundException('No admin account found for this id : '.$id);
        }

        $data = json_decode($request->getContent(), false);

        $hashedPassword = $this->passwordHasher->hashPassword(
            $adminAccount,
            $data->plainPassword
        );

        if($hashedPassword === $adminAccount->getPassword()) {
            $adminAccount->setPassword($hashedPassword);
            $entityManager->flush();
        } else {
            throw $this->createNotFoundException('This is not the actual password');
        }

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
