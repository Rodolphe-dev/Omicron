<?php
// api/src/Controller/NavbarController.php
namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;

use App\Entity\Navbar;

use Doctrine\ORM\EntityManagerInterface;

#[AsController]
class NavbarController extends AbstractController
{
    public function __construct()
    {
    }

    #[Route(
        name: 'updateNavbarStatus',
        path: '/api/navbars/updateNavbarStatus/{id}',
        methods: ['PATCH'],
    )]
    public function updateNavbarStatus($id, EntityManagerInterface $entityManager)
    {
        $navbar = $entityManager->getRepository(Navbar::class)->find($id);

        if (!$navbar) {
            throw $this->createNotFoundException(
                'No navbar found for id : ' . $id
            );
        }

        $checkIfNavbarActive = $entityManager->getRepository(Navbar::class)->findOneBy(['status' => true]);

        if (!$checkIfNavbarActive || $checkIfNavbarActive->getId() == $id) {
            if ($navbar->isStatus() === false) {
                $navbar->setStatus(true);
            } else {
                $navbar->setStatus(false);
            }

            $entityManager->flush();

            return new JsonResponse(
                [
                    'id' => $navbar->getId(),
                    'name' => $navbar->getName(),
                    'status' => $navbar->isStatus(),
                    'items' => $navbar->getItems()
                ]
            );
        } else {
            throw $this->createNotFoundException(
                'One navbar already active, his id is : ' . $checkIfNavbarActive->getId()
            );
        }
    }
}
