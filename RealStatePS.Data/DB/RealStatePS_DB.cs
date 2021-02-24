using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using RealStatePS.Entity;

namespace RealStatePS.Data.DB
{
    public class RealStatePS_DB: DbContext
    {
        public IConfiguration Configuration { get; }

        public RealStatePS_DB(DbContextOptions<RealStatePS_DB> options)
            : base(options)
        {
        }

        public virtual DbSet<AspNetRoles> AspNetRoles { get; set; }
        public virtual DbSet<AspNetUsers> AspNetUsers { get; set; }
        public virtual DbSet<UserProfile> UserProfile { get; set; }
        public virtual DbSet<Property> Property { get; set; }
        public virtual DbSet<PropertyImage> PropertyImage { get; set; }
        public virtual DbSet<PropertyOperation> PropertyOperation { get; set; }
        public virtual DbSet<PropertyType> PropertyType { get; set; }
        public virtual DbSet<MailConfig> MailConfig { get; set; }
        public virtual DbSet<PasswordRecover> PasswordRecover { get; set; }
        public virtual DbSet<TemporalViewUsers> TemporalViewUsers { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<AspNetRoles>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();
            });

            modelBuilder.Entity<AspNetUsers>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();
            });

            modelBuilder.Entity<Newsletter>(entity =>
            {
                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasMaxLength(256);
            });

            modelBuilder.Entity<Property>(entity =>
            {
                entity.Property(e => e.Company).HasMaxLength(1024);

                entity.Property(e => e.Bathrooms).HasColumnType("decimal(10, 2)");

                entity.Property(e => e.Bedrooms).HasColumnType("decimal(10, 2)");

                entity.Property(e => e.Created).HasColumnType("datetime");

                entity.Property(e => e.Creator)
                    .IsRequired()
                    .HasMaxLength(450);

                entity.Property(e => e.MetersBuilt).HasColumnType("decimal(12, 2)");

                entity.Property(e => e.MetersLand).HasColumnType("decimal(12, 2)");

                entity.Property(e => e.Modified).HasColumnType("datetime");

                entity.Property(e => e.Modifier).HasMaxLength(450);

                entity.Property(e => e.Municipality).HasMaxLength(256);

                entity.Property(e => e.Number).HasMaxLength(64);

                entity.Property(e => e.PhoneOne)
                    .IsRequired()
                    .HasMaxLength(32);

                entity.Property(e => e.PhoneTwo).HasMaxLength(32);

                entity.Property(e => e.Price).HasColumnType("decimal(12, 2)");

                entity.Property(e => e.Settlement)
                    .IsRequired()
                    .HasMaxLength(256);

                entity.Property(e => e.State)
                    .IsRequired()
                    .HasMaxLength(128);

                entity.Property(e => e.Street)
                    .IsRequired()
                    .HasMaxLength(256);

                entity.Property(e => e.Title)
                    .IsRequired()
                    .HasMaxLength(512);

                entity.Property(e => e.VideoLink).HasMaxLength(1024);

                entity.Property(e => e.WebSite).HasMaxLength(1024);

                entity.HasOne(d => d.PropertyOperation)
                    .WithMany(p => p.Property)
                    .HasForeignKey(d => d.PropertyOperationId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_PropertyOperation");

                entity.HasOne(d => d.PropertyType)
                    .WithMany(p => p.Property)
                    .HasForeignKey(d => d.PropertyTypeId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_PropertyType");

                entity.HasOne(d => d.UserProfile)
                    .WithMany(p => p.Property)
                    .HasForeignKey(d => d.UserProfileId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_PropertyUserProfile");
            });

            modelBuilder.Entity<PropertyImage>(entity =>
            {
                entity.Property(e => e.Created).HasColumnType("datetime");

                entity.Property(e => e.Creator)
                    .IsRequired()
                    .HasMaxLength(450);

                entity.Property(e => e.Modified).HasColumnType("datetime");

                entity.Property(e => e.Modifier).HasMaxLength(450);

                entity.Property(e => e.Url)
                    .IsRequired()
                    .HasColumnName("URL")
                    .HasMaxLength(1024);

                entity.HasOne(d => d.Property)
                    .WithMany(p => p.PropertyImage)
                    .HasForeignKey(d => d.PropertyId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Property");
            });

            modelBuilder.Entity<PropertyOperation>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Created).HasColumnType("datetime");

                entity.Property(e => e.Creator)
                    .IsRequired()
                    .HasMaxLength(450);

                entity.Property(e => e.Description).HasMaxLength(512);

                entity.Property(e => e.Modified).HasColumnType("datetime");

                entity.Property(e => e.Modifier).HasMaxLength(450);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(128);
            });

            modelBuilder.Entity<PropertyType>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Created).HasColumnType("datetime");

                entity.Property(e => e.Creator)
                    .IsRequired()
                    .HasMaxLength(450);

                entity.Property(e => e.Description)
                    .IsRequired()
                    .HasMaxLength(512);

                entity.Property(e => e.Modified).HasColumnType("datetime");

                entity.Property(e => e.Modifier).HasMaxLength(450);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(128);
            });

            modelBuilder.Entity<UserProfile>(entity =>
            {
                entity.Property(e => e.Company).HasMaxLength(1024);

                entity.Property(e => e.Created).HasColumnType("datetime");

                entity.Property(e => e.Creator)
                    .IsRequired()
                    .HasMaxLength(450);

                entity.Property(e => e.LastName)
                    .IsRequired()
                    .HasMaxLength(512);

                entity.Property(e => e.Modified).HasColumnType("datetime");

                entity.Property(e => e.Modifier).HasMaxLength(450);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(512);

                entity.Property(e => e.PhoneOne)
                    .IsRequired()
                    .HasMaxLength(32);

                entity.Property(e => e.PhoneTwo).HasMaxLength(32);

                entity.Property(e => e.SecondLastName).HasMaxLength(512);

                entity.Property(e => e.UserId)
                    .IsRequired()
                    .HasMaxLength(450);

                entity.Property(e => e.WebSite).HasMaxLength(1024);
            });

            modelBuilder.Entity<MailConfig>(entity =>
            {
                entity.Property(e => e.Email).IsRequired();

                entity.Property(e => e.Host)
                    .IsRequired()
                    .HasMaxLength(512);

                entity.Property(e => e.Name).HasMaxLength(1024);

                entity.Property(e => e.Password)
                    .IsRequired()
                    .HasMaxLength(512);
            });

            modelBuilder.Entity<PasswordRecover>(entity =>
            {
                entity.Property(e => e.Code).HasMaxLength(512);

                entity.Property(e => e.Date).HasColumnType("datetime");

                entity.Property(e => e.DueDate).HasColumnType("datetime");

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasMaxLength(256);

                entity.Property(e => e.RecoverDate).HasColumnType("datetime");
            });
            modelBuilder.Entity<TemporalViewUsers>(entity =>
            {
                entity.Property(e => e.UserId)
                    .IsRequired()
                    .HasMaxLength(450);
            });
        }
    }
}
