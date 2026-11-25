import { ButtonLink, Container, Heading, Ornament } from "@/components/ui";

export default function NotFound() {
  return (
    <Container className="pt-24 md:pt-32 text-center">
      <Ornament />
      <Heading as="h1" className="mt-8">
        Deze pagina bestaat niet
      </Heading>
      <p className="mt-5 text-lg text-muted">Adem even in, en laten we de weg terug vinden.</p>
      <div className="mt-10">
        <ButtonLink href="/">Terug naar home</ButtonLink>
      </div>
    </Container>
  );
}
