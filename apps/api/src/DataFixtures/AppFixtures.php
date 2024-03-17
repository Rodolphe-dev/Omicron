<?php

namespace App\DataFixtures;

use App\Entity\Navbar;
use App\Entity\Sidebar;
use App\Entity\Footer;
use App\Entity\Page;
use App\Entity\AdminAccount;
use App\Entity\Setting;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class AppFixtures extends Fixture
{
    private $hasher;

    public function __construct(UserPasswordHasherInterface $hasher)
    {
        $this->hasher = $hasher;
    }

    public function load(ObjectManager $manager): void
    {
        /** 
         * FOR TESTING ONLY
         */

        /*
        for ($i = 0; $i < 10; $i++) {
            $navbar = new Navbar();
            $navbar->setName('Navbar name ' . $i);
            $items = array(
                (object) [
                    'parent' => true,
                    'parentName' => 'Parent Item ' . $i,
                    'name' => 'Item Name ' . $i,
                    'url' => 'route_' . $i
                ]
            );
            $navbar->setitems($items);
            $manager->persist($navbar);
        }

        for ($i = 0; $i < 10; $i++) {
            $sidebar = new Sidebar();
            $sidebar->setName('sidebar name ' . $i);
            $items = array(
                (object) [
                    'parent' => true,
                    'parentName' => 'Parent Item ' . $i,
                    'name' => 'Item Name ' . $i,
                    'url' => 'route_' . $i
                ]
            );
            $sidebar->setitems($items);
            $manager->persist($sidebar);
        }

        for ($i = 0; $i < 10; $i++) {
            $footer = new Footer();
            $footer->setName('footer name ' . $i);
            $footer->setContent('footer content ' . $i);
            $manager->persist($footer);
        }
        */

        /** Create first component */

        $navbar = new Navbar();
        $navbar->setName('Default Navbar');
        $items = array(
            (object) [
                'parent' => false,
                'parentName' => '',
                'name' => 'Item 1',
                'url' => 'home'
            ],
            (object) [
                'parent' => false,
                'parentName' => '',
                'name' => 'Item 2',
                'url' => 'route_2'
            ],
            (object) [
                'parent' => false,
                'parentName' => '',
                'name' => 'Item 3',
                'url' => 'route_3'
            ],
            (object) [
                'parent' => false,
                'parentName' => '',
                'name' => 'Item 4',
                'url' => 'route_4'
            ],
            (object) [
                'parent' => false,
                'parentName' => '',
                'name' => 'Item 5',
                'url' => 'route_5'
            ],
        );
        $navbar->setitems($items);
        $manager->persist($navbar);

        $footer = new Footer();
        $footer->setName('Default footer');
        $footer->setContent('Copyright © 2023 - All right reserved - Powered by Omicron');
        $manager->persist($footer);

        $page = new Page();
        $page->setName('Home');
        $page->setRoute('home');
        $page->setContent('
                    Aute ullamco labore adipisicing consequat eu adipisicing commodo et et minim ullamco Lorem. Voluptate nulla eiusmod sunt Lorem cupidatat occaecat non et cillum nisi velit esse. Sint id ipsum aliqua nisi excepteur aliqua incididunt officia aute reprehenderit.

                    Incididunt quis Lorem voluptate mollit dolore proident voluptate laboris mollit ut. Amet exercitation do officia cupidatat laborum cillum nisi veniam duis dolore ullamco. Officia incididunt non ad laboris officia dolor. Ipsum proident aliqua irure cillum ea id.

                    Nisi qui sint dolore nulla quis laboris ut ipsum nostrud consectetur sunt irure nulla. Ex nostrud do culpa in in officia nostrud aliqua pariatur quis mollit consequat. Laboris irure ea ex qui exercitation adipisicing reprehenderit ad magna commodo. Exercitation nisi Lorem quis ad nisi duis cillum aute laborum reprehenderit officia qui. Anim Lorem consectetur commodo officia irure officia adipisicing.

                    Voluptate ea minim commodo nulla eu id cupidatat aliqua qui ad voluptate do tempor. Aute occaecat eu voluptate cupidatat nostrud nisi exercitation. Eu occaecat esse qui adipisicing id magna duis.

                    Amet aliqua id consequat in est consequat excepteur id dolor tempor qui aute. Qui veniam eu cillum esse dolore consequat anim. Est sunt aute quis nostrud irure laborum elit sunt culpa. Lorem mollit velit Lorem sint qui excepteur. Pariatur consequat culpa consectetur laboris ex sit culpa culpa aliquip excepteur minim non adipisicing id. Ad eiusmod et sint fugiat non minim cupidatat culpa amet. Incididunt duis dolor cillum do nisi ipsum quis.

                    Irure culpa eu tempor nostrud pariatur. Enim aliquip aute laboris nostrud sint exercitation esse quis elit ipsum Lorem pariatur in. Esse et fugiat est nulla do elit commodo enim. Esse sunt ex adipisicing duis nostrud exercitation proident enim laboris non. Anim veniam pariatur sit amet occaecat elit labore ea laborum reprehenderit deserunt sint excepteur.

                    Occaecat quis labore dolore consectetur excepteur dolor labore pariatur. Officia ut cupidatat aute exercitation duis. Minim qui incididunt tempor amet ex do ad aliquip est commodo.

                    Velit ipsum magna ipsum exercitation officia deserunt dolor. Ad mollit sint veniam cillum sint nulla voluptate. Sunt id aliquip minim occaecat enim veniam velit ullamco velit dolore commodo proident.

                    In ea excepteur in in esse tempor culpa labore adipisicing amet cillum aliquip. Eu officia quis dolore labore. Ullamco occaecat commodo nulla esse labore duis magna ex adipisicing eu sunt minim ad non. Ex occaecat esse proident velit minim elit minim amet sit id aute pariatur.

                    Ullamco minim proident id ea qui consequat consequat ipsum mollit adipisicing reprehenderit. Consequat sint cupidatat magna velit ea ex. Consequat laboris non amet dolore officia non commodo. In exercitation consequat id nostrud duis sint. Exercitation irure ex sunt anim eiusmod aliquip sunt sit sunt cillum duis quis adipisicing nulla. Sit sunt aliquip ullamco reprehenderit proident eiusmod in incididunt. Ex nulla veniam Lorem sunt irure ullamco deserunt amet aliqua nulla ipsum qui.
                ');
        $manager->persist($page);

        for ($i = 1; $i < 5; $i++) {
            $page = new Page();
            $page->setName('page name ' . $i);
            $page->setRoute('route_' . $i);
            $page->setContent('
                    Aute ullamco labore adipisicing consequat eu adipisicing commodo et et minim ullamco Lorem. Voluptate nulla eiusmod sunt Lorem cupidatat occaecat non et cillum nisi velit esse. Sint id ipsum aliqua nisi excepteur aliqua incididunt officia aute reprehenderit.

                    Incididunt quis Lorem voluptate mollit dolore proident voluptate laboris mollit ut. Amet exercitation do officia cupidatat laborum cillum nisi veniam duis dolore ullamco. Officia incididunt non ad laboris officia dolor. Ipsum proident aliqua irure cillum ea id.

                    Nisi qui sint dolore nulla quis laboris ut ipsum nostrud consectetur sunt irure nulla. Ex nostrud do culpa in in officia nostrud aliqua pariatur quis mollit consequat. Laboris irure ea ex qui exercitation adipisicing reprehenderit ad magna commodo. Exercitation nisi Lorem quis ad nisi duis cillum aute laborum reprehenderit officia qui. Anim Lorem consectetur commodo officia irure officia adipisicing.

                    Voluptate ea minim commodo nulla eu id cupidatat aliqua qui ad voluptate do tempor. Aute occaecat eu voluptate cupidatat nostrud nisi exercitation. Eu occaecat esse qui adipisicing id magna duis.

                    Amet aliqua id consequat in est consequat excepteur id dolor tempor qui aute. Qui veniam eu cillum esse dolore consequat anim. Est sunt aute quis nostrud irure laborum elit sunt culpa. Lorem mollit velit Lorem sint qui excepteur. Pariatur consequat culpa consectetur laboris ex sit culpa culpa aliquip excepteur minim non adipisicing id. Ad eiusmod et sint fugiat non minim cupidatat culpa amet. Incididunt duis dolor cillum do nisi ipsum quis.

                    Irure culpa eu tempor nostrud pariatur. Enim aliquip aute laboris nostrud sint exercitation esse quis elit ipsum Lorem pariatur in. Esse et fugiat est nulla do elit commodo enim. Esse sunt ex adipisicing duis nostrud exercitation proident enim laboris non. Anim veniam pariatur sit amet occaecat elit labore ea laborum reprehenderit deserunt sint excepteur.

                    Occaecat quis labore dolore consectetur excepteur dolor labore pariatur. Officia ut cupidatat aute exercitation duis. Minim qui incididunt tempor amet ex do ad aliquip est commodo.

                    Velit ipsum magna ipsum exercitation officia deserunt dolor. Ad mollit sint veniam cillum sint nulla voluptate. Sunt id aliquip minim occaecat enim veniam velit ullamco velit dolore commodo proident.

                    In ea excepteur in in esse tempor culpa labore adipisicing amet cillum aliquip. Eu officia quis dolore labore. Ullamco occaecat commodo nulla esse labore duis magna ex adipisicing eu sunt minim ad non. Ex occaecat esse proident velit minim elit minim amet sit id aute pariatur.

                    Ullamco minim proident id ea qui consequat consequat ipsum mollit adipisicing reprehenderit. Consequat sint cupidatat magna velit ea ex. Consequat laboris non amet dolore officia non commodo. In exercitation consequat id nostrud duis sint. Exercitation irure ex sunt anim eiusmod aliquip sunt sit sunt cillum duis quis adipisicing nulla. Sit sunt aliquip ullamco reprehenderit proident eiusmod in incididunt. Ex nulla veniam Lorem sunt irure ullamco deserunt amet aliqua nulla ipsum qui.
                ');
            $manager->persist($page);
        }

        /** Create defaults setting */
        $setting = new Setting();
        $setting->setNameApp('App Name');
        $setting->setStatusMaintenance(false);
        $manager->persist($setting);

        /** Create first admin account */
        $adminAccount = new AdminAccount();
        $adminAccount->setUsername('admin');
        $adminAccount->setEmail('admin@admin.com');
        $adminAccount->setSuperadmin(true);
        $adminAccount->setPassword(
            $this->hasher->hashPassword($adminAccount, 'password')
        );
        $manager->persist($adminAccount);

        $manager->flush();
    }
}
