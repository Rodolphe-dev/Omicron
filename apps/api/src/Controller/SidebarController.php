<?php
// api/src/Controller/SidebarController.php
namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;

use App\Entity\Sidebar;

use Doctrine\ORM\EntityManagerInterface;

#[AsController]
class SidebarController extends AbstractController
{
    public function __construct()
    {
    }

    #[Route(
        name: 'updateSidebarStatus',
        path: '/api/sidebars/updateSidebarStatus/{id}',
        methods: ['PATCH'],
    )]
    public function updateSidebarStatus($id, EntityManagerInterface $entityManager)
    {
        $sidebar = $entityManager->getRepository(Sidebar::class)->find($id);

        if (!$sidebar) {
            throw $this->createNotFoundException(
                'No sidebar found for id : ' . $id
            );
        }

        $checkIfSidebarActive = $entityManager->getRepository(Sidebar::class)->findOneBy(['status' => true]);

        if (!$checkIfSidebarActive || $checkIfSidebarActive->getId() == $id) {
            if ($sidebar->isStatus() === false) {
                $sidebar->setStatus(true);
            } else {
                $sidebar->setStatus(false);
            }

            $entityManager->flush();

            return new JsonResponse(
                [
                    'id' => $sidebar->getId(),
                    'name' => $sidebar->getName(),
                    'status' => $sidebar->isStatus(),
                    'items' => $sidebar->getItems()
                ]
            );
        } else {
            throw $this->createNotFoundException(
                'One sidebar already active, his id is : ' . $checkIfSidebarActive->getId()
            );
        }
    }
}
