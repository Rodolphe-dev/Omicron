<?php

// api/src/Controller/PageController.php

namespace App\Controller;

use App\Entity\Page;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\Routing\Annotation\Route;

#[AsController]
class PageController extends AbstractController
{
    public function __construct()
    {
    }

    #[Route(
        name: 'getPageByRoute',
        path: '/api/pages/getPageByRoute/{route}',
        methods: ['GET'],
    )]
    public function getPageByRoute($route, EntityManagerInterface $entityManager)
    {
        $page = $entityManager->getRepository(Page::class)->findOneBy(['route' => $route]);

        if (!$page) {
            throw $this->createNotFoundException('No page found for this route : '.$route);
        }

        return new JsonResponse(
            [
                'route' => $page->getRoute(),
                'content' => $page->getContent(),
            ]
        );
    }
}
