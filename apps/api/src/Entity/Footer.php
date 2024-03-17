<?php

namespace App\Entity;

use App\Repository\FooterRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Doctrine\Orm\Filter\SearchFilter;


#[ORM\Entity(repositoryClass: FooterRepository::class)]
#[ApiResource(
    normalizationContext: ['groups' => ['user:read']],
    denormalizationContext: ['groups' => ['user:create', 'user:update']],
    operations: [
        new GetCollection(),
        new Post(
            security: "is_granted('ROLE_ADMIN')",
            securityMessage: 'Only admins can access this.'
        ),
        new Get(),
        new Put(
            security: "is_granted('ROLE_ADMIN')",
            securityMessage: 'Only admins can access this.'
        ),
        new Patch(
            security: "is_granted('ROLE_ADMIN')",
            securityMessage: 'Only admins can access this.'
        ),
        new Delete(
            security: "is_granted('ROLE_ADMIN')",
            securityMessage: 'Only admins can access this.'
        ),
    ],
    paginationItemsPerPage: 20,
    paginationPartial: true,
    paginationEnabled: true
)]
class Footer
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['user:read'])]
    #[ApiFilter(SearchFilter::class, strategy: "exact")]
    private ?int $id = null;

    #[Groups(['user:read', 'user:create', 'user:update'])]
    #[ORM\Column(length: 255)]
    #[Assert\Length(max: 255)]
    #[Assert\Type('string')]
    #[Assert\NotBlank]
    #[Assert\NoSuspiciousCharacters]
    private ?string $name = null;

    #[Groups(['user:read', 'user:create', 'user:update'])]
    #[ORM\Column(length: 300, nullable: true)]
    #[Assert\Length(max: 300)]
    #[Assert\Type('string')]
    private ?string $content = null;

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

    public function setName(string $name): static
    {
        $this->name = $name;

        return $this;
    }

    public function getContent(): ?string
    {
        return $this->content;
    }

    public function setContent(?string $content): static
    {
        $this->content = $content;

        return $this;
    }
}
