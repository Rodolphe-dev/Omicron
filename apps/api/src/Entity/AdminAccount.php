<?php

namespace App\Entity;

use App\Repository\AdminAccountRepository;
use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Metadata\ApiProperty;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use Doctrine\ORM\Mapping as ORM;
use App\State\UserPasswordHasher;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;
use ApiPlatform\Doctrine\Orm\Filter\SearchFilter;

#[ORM\Entity(repositoryClass: AdminAccountRepository::class)]
#[UniqueEntity('username')]
#[ApiResource(
    normalizationContext: ['groups' => ['user:read']],
    denormalizationContext: ['groups' => ['user:create', 'user:update']],
    operations: [
        new GetCollection(
            security: "is_granted('ROLE_SUPER_ADMIN')",
            securityMessage: 'Only super admins can access this.'
        ),
        new Post(
            processor: UserPasswordHasher::class,
            validationContext: ['groups' => ['Default', 'user:create']],
            security: "is_granted('ROLE_SUPER_ADMIN')",
            securityMessage: 'Only super admins can access this.'
        ),
        new Get(
            security: "is_granted('ROLE_ADMIN') or is_granted('ROLE_SUPER_ADMIN')",
            securityMessage: 'Only admins can access this.'
        ),
        new Put(
            processor: UserPasswordHasher::class,
            security: "is_granted('ROLE_SUPER_ADMIN')",
            securityMessage: 'Only super admins can access this.'
        ),
        new Patch(
            processor: UserPasswordHasher::class,
            security: "is_granted('ROLE_ADMIN') or is_granted('ROLE_SUPER_ADMIN')",
            securityMessage: 'Only admins can access this.'
        ),
        new Delete(
            security: "is_granted('ROLE_SUPER_ADMIN')",
            securityMessage: 'Only super admins can access this.'
        ),
    ],
    paginationItemsPerPage: 20,
    paginationPartial: true,
    paginationEnabled: true
)]
class AdminAccount implements UserInterface, PasswordAuthenticatedUserInterface
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['user:read'])]
    #[ApiFilter(SearchFilter::class, strategy: "exact")]
    private ?int $id = null;

    #[Groups(['user:read', 'user:create', 'user:update'])]
    #[ORM\Column(length: 255, unique: true)]
    #[Assert\Length(min: 3, max: 25)]
    #[Assert\Type('string')]
    #[Assert\NotBlank]
    #[Assert\NoSuspiciousCharacters]
    private ?string $username = null;

    #[Groups(['user:read', 'user:create', 'user:update'])]
    #[ORM\Column(length: 255, nullable: true)]
    #[Assert\Length(max: 255)]
    #[Assert\Type('string')]
    #[Assert\NotBlank]
    #[Assert\Email]
    private ?string $email = null;

    #[ORM\Column(length: 5000)]
    #[Assert\NotBlank]
    private ?string $password = null;

    #[Groups(['user:create', 'user:update'])]
    #[Assert\Length(min: 8, max: 25)]
    #[Assert\Type('string')]
    #[Assert\NotBlank]
    private ?string $plainPassword = null;

    #[Groups(['user:read', 'user:create', 'user:update'])]
    #[ORM\Column]
    #[Assert\Type('boolean')]
    #[Assert\NotNull]
    private ?bool $superadmin = null;

    #[ORM\Column(type: 'json')]
    private array $roles = [];

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUsername(): ?string
    {
        return $this->username;
    }

    public function setUsername(string $username): static
    {
        $this->username = $username;

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(?string $email): static
    {
        $this->email = $email;

        return $this;
    }

    public function isSuperadmin(): ?bool
    {
        return $this->superadmin;
    }

    public function setSuperadmin(bool $superadmin): static
    {
        $this->superadmin = $superadmin;

        return $this;
    }

    /**
     * @see PasswordAuthenticatedUserInterface
     */
    public function getPassword(): ?string
    {
        return $this->password;
    }

    public function setPassword(string $password): static
    {
        $this->password = $password;

        return $this;
    }

    public function getPlainPassword(): ?string
    {
        return $this->plainPassword;
    }

    public function setPlainPassword(?string $plainPassword): self
    {
        $this->plainPassword = $plainPassword;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        if ($this->superadmin === true) {
            $roles[] = 'ROLE_SUPER_ADMIN';
        } else {
            $roles[] = 'ROLE_ADMIN';
        }

        return array_unique($roles);
    }

    public function setRoles(array $roles): self
    {
        $this->roles = $roles;

        if ($this->superadmin === true) {
            $roles[] = 'ROLE_SUPER_ADMIN';
        } else {
            $roles[] = 'ROLE_ADMIN';
        }

        return $this;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUserIdentifier(): string
    {
        return (string) $this->username;
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials(): void
    {
        $this->plainPassword = null;
    }
}
