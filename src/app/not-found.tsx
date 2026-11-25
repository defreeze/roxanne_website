import { ButtonLink, Container } from "@/components/ui";

export default function NotFound() {
  return (
    <Container className="pt-24 md:pt-32 text-center">
      <p className="text-sm text-muted">404</p>
      <h1 className="mt-2 font-serif text-4xl md:text-5xl tracking-tight">This page doesn&apos;t exist</h1>
      <div className="mt-8">
        <ButtonLink href="/">Back to home</ButtonLink>
      </div>
    </Container>
  );
}
