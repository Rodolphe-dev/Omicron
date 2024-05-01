<?php

namespace App\Entity;

use App\Repository\SettingRepository;
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

#[ORM\Entity(repositoryClass: SettingRepository::class)]
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
        new Get(),
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
class Setting
{
    #[ORM\Id]
    #[ORM\Column]
    #[Groups(['user:read'])]
    #[ApiFilter(SearchFilter::class, strategy: "exact")]
    private ?int $id = 1;

    #[Groups(['user:read', 'user:create', 'user:update'])]
    #[ORM\Column(length: 255)]
    #[Assert\Type('string')]
    #[Assert\Length(max: 25)]
    #[Assert\NotBlank]
    #[Assert\NoSuspiciousCharacters]
    private ?string $nameApp = null;

    #[Groups(['user:read', 'user:create', 'user:update'])]
    #[ORM\Column]
    #[Assert\Type('boolean')]
    #[Assert\NotNull]
    private ?bool $statusMaintenance = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNameApp(): ?string
    {
        return $this->nameApp;
    }

    public function setNameApp(string $nameApp): static
    {
        $this->nameApp = $nameApp;

        return $this;
    }

    public function isStatusMaintenance(): ?bool
    {
        return $this->statusMaintenance;
    }

    public function setStatusMaintenance(bool $statusMaintenance): static
    {
        $this->statusMaintenance = $statusMaintenance;

        return $this;
    }
}
