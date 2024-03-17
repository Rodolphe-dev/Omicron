<?php
// api/src/Controller/PageController.php
namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;

use App\Entity\Page;

use Doctrine\ORM\EntityManagerInterface;

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

        return new JsonResponse(
            [
                'route' => $page->getRoute(),
                'content' => $page->getContent()
            ]
        );
    }
}
