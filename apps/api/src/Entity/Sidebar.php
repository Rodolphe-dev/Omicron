<?php

namespace App\Entity;

use ApiPlatform\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use App\Repository\SidebarRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: SidebarRepository::class)]
#[ApiResource(
    normalizationContext: ['groups' => ['user:read']],
    denormalizationContext: ['groups' => ['user:create', 'user:update']],
    operations: [
        new GetCollection(
            security: "is_granted('ROLE_ADMIN') or is_granted('ROLE_SUPER_ADMIN')",
            securityMessage: 'Only admins can access this.'
        ),
        new Post(
            security: "is_granted('ROLE_ADMIN') or is_granted('ROLE_SUPER_ADMIN')",
            securityMessage: 'Only admins can access this.'
        ),
        new Get(
            security: "is_granted('ROLE_ADMIN') or is_granted('ROLE_SUPER_ADMIN')",
            securityMessage: 'Only admins can access this.'
        ),
        new Put(
            security: "is_granted('ROLE_ADMIN') or is_granted('ROLE_SUPER_ADMIN')",
            securityMessage: 'Only admins can access this.'
        ),
        new Patch(
            security: "is_granted('ROLE_ADMIN') or is_granted('ROLE_SUPER_ADMIN')",
            securityMessage: 'Only admins can access this.'
        ),
        new Delete(
            security: "is_granted('ROLE_ADMIN') or is_granted('ROLE_SUPER_ADMIN')",
            securityMessage: 'Only admins can access this.'
        ),
    ],
    paginationItemsPerPage: 20,
    paginationPartial: true,
    paginationEnabled: true
)]
class Sidebar
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['user:read'])]
    #[ApiFilter(SearchFilter::class, strategy: 'exact')]
    private ?int $id = null;

    #[Groups(['user:read', 'user:create', 'user:update'])]
    #[ORM\Column(length: 255)]
    #[Assert\Type('string')]
    #[Assert\Length(max: 25)]
    #[Assert\NotBlank]
    #[Assert\NoSuspiciousCharacters]
    private ?string $name = null;

    #[Groups(['user:read', 'user:create', 'user:update'])]
    #[ORM\Column]
    #[Assert\Type('boolean')]
    #[Assert\NotNull]
    private ?bool $status = null;

    #[Groups(['user:read', 'user:create', 'user:update'])]
    #[ORM\Column(nullable: true)]
    private ?array $items = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function setId(int $id): static
    {
        $this->id = $id;

        return $this;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(?string $name): static
    {
        $this->name = $name;

        return $this;
    }

    public function isStatus(): ?bool
    {
        return $this->status;
    }

    public function setStatus(bool $status): static
    {
        $this->status = $status;

        return $this;
    }

    public function getItems(): ?array
    {
        return $this->items;
    }

    public function setItems(?array $items): static
    {
        $this->items = $items;

        return $this;
    }
}
