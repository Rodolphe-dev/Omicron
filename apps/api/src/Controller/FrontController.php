<?php
// api/src/Controller/FrontController.php
namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;

use App\Entity\Navbar;
use App\Entity\Sidebar;
use App\Entity\Footer;
use App\Entity\Setting;
use App\Entity\Page;

use Doctrine\ORM\EntityManagerInterface;

#[AsController]
class FrontController extends AbstractController
{
    public function __construct()
    {
    }

    #[Route(
        name: 'getFrontData',
        path: '/api/frontdata/getFrontData',
        methods: ['GET'],
    )]
    public function getFrontData(EntityManagerInterface $entityManager)
    {
        $navbar = $entityManager->getRepository(Navbar::class)->findOneBy(['status' => true]);
        $sidebar = $entityManager->getRepository(Sidebar::class)->findOneBy(['status' => true]);
        $footer = $entityManager->getRepository(Footer::class)->findOneBy(['status' => true]);
        $setting = $entityManager->getRepository(Setting::class)->find(1);
        $page = $entityManager->getRepository(Page::class)->findOneBy(['route' => 'home']);

        if (!$navbar && $sidebar) {
            return new JsonResponse(
                [
                    'navbar' => [
                        'name' => null,
                        'status' => null,
                        'items' => null
                    ],
                    'sidebar' => [
                        'name' => $sidebar->getName(),
                        'status' => $sidebar->isStatus(),
                        'items' => $sidebar->getItems()
                    ],
                    'footer' => [
                        'name' => $footer->getName(),
                        'status' => $footer->isStatus(),
                        'content' => $footer->getContent()
                    ],
                    'setting' => [
                        'nameApp' => $setting->getNameApp(),
                        'statusMaintenance' => $setting->isStatusMaintenance()
                    ],
                    'page' => [
                        'name' => $page->getName(),
                        'route' => $page->getRoute(),
                        'content' => $page->getContent()
                    ]
                ]
            );
        } elseif (!$navbar && !$sidebar) {
            return new JsonResponse(
                [
                    'navbar' => [
                        'name' => null,
                        'status' => null,
                        'items' => null
                    ],
                    'sidebar' => [
                        'name' => null,
                        'status' => null,
                        'items' => null
                    ],
                    'footer' => [
                        'name' => $footer->getName(),
                        'status' => $footer->isStatus(),
                        'content' => $footer->getContent()
                    ],
                    'setting' => [
                        'nameApp' => $setting->getNameApp(),
                        'statusMaintenance' => $setting->isStatusMaintenance()
                    ],
                    'page' => [
                        'name' => $page->getName(),
                        'route' => $page->getRoute(),
                        'content' => $page->getContent()
                    ]
                ]
            );
        } elseif ($navbar && !$sidebar) {
            return new JsonResponse(
                [
                    'navbar' => [
                        'name' => $navbar->getName(),
                        'status' => $navbar->isStatus(),
                        'items' => $navbar->getItems()
                    ],
                    'sidebar' => [
                        'name' => null,
                        'status' => null,
                        'items' => null
                    ],
                    'footer' => [
                        'name' => $footer->getName(),
                        'status' => $footer->isStatus(),
                        'content' => $footer->getContent()
                    ],
                    'setting' => [
                        'nameApp' => $setting->getNameApp(),
                        'statusMaintenance' => $setting->isStatusMaintenance()
                    ],
                    'page' => [
                        'name' => $page->getName(),
                        'route' => $page->getRoute(),
                        'content' => $page->getContent()
                    ]
                ]
            );
        } else {
            return new JsonResponse(
                [
                    'navbar' => [
                        'name' => $navbar->getName(),
                        'status' => $navbar->isStatus(),
                        'items' => $navbar->getItems()
                    ],
                    'sidebar' => [
                        'name' => $sidebar->getName(),
                        'status' => $sidebar->isStatus(),
                        'items' => $sidebar->getItems()
                    ],
                    'footer' => [
                        'name' => $footer->getName(),
                        'status' => $footer->isStatus(),
                        'content' => $footer->getContent()
                    ],
                    'setting' => [
                        'nameApp' => $setting->getNameApp(),
                        'statusMaintenance' => $setting->isStatusMaintenance()
                    ],
                    'page' => [
                        'name' => $page->getName(),
                        'route' => $page->getRoute(),
                        'content' => $page->getContent()
                    ]
                ]
            );
        }
    }
}
