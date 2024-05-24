<?php

// api/src/Controller/FooterController.php

namespace App\Controller;

use App\Entity\Footer;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\Routing\Annotation\Route;

#[AsController]
class FooterController extends AbstractController
{
    public function __construct()
    {
    }

    #[Route(
        name: 'updateFooterStatus',
        path: '/api/footers/updateFooterStatus/{id}',
        methods: ['PATCH'],
    )]
    public function updateFooterStatus($id, EntityManagerInterface $entityManager)
    {
        $footer = $entityManager->getRepository(Footer::class)->find($id);

        if (!$footer) {
            throw $this->createNotFoundException('No footer found for id : '.$id);
        }

        $checkIfFooterActive = $entityManager->getRepository(Footer::class)->findOneBy(['status' => true]);

        if (!$checkIfFooterActive || $checkIfFooterActive->getId() == $id) {
            if (false === $footer->isStatus()) {
                $footer->setStatus(true);
            } else {
                $footer->setStatus(false);
            }

            $entityManager->flush();

            return new JsonResponse(
                [
                    'id' => $footer->getId(),
                    'name' => $footer->getName(),
                    'status' => $footer->isStatus(),
                    'content' => $footer->getContent(),
                ]
            );
        } else {
            throw $this->createNotFoundException('One footer already active, his id is : '.$checkIfFooterActive->getId());
        }
    }
}
