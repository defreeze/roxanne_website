import { ButtonLink, Container, Heading, Ornament } from "@/components/ui";

export default function NotFound() {
  return (
    <Container className="pt-24 md:pt-32 text-center">
      <Ornament />
      <Heading as="h1" className="mt-8">
        This page couldn&apos;t be found
      </Heading>
      <p className="mt-5 text-lg text-muted">Take a breath, and let&apos;s find our way back.</p>
      <div className="mt-10">
        <ButtonLink href="/">Back to home</ButtonLink>
      </div>
    </Container>
  );
}
