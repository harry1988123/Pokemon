"use client";

import styled from 'styled-components';
import Image from "next/image";
import { usePokemonDetails } from "@/hooks/use-pokemon-details";
import { typeColors } from "@/lib/constants";

const Dialog = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 50;
`;

const DialogContent = styled.div`
  background: var(--background);
  border-radius: var(--radius);
  border: 1px solid var(--border);
  padding: 1.5rem;
  width: 100%;
  max-width: 42rem;
  margin: 1rem;
  max-height: calc(100vh - 2rem);
  overflow-y: auto;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
`;

const DialogHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const DialogTitle = styled.h2`
  font-size: 1.875rem;
  font-weight: bold;
  text-transform: capitalize;
`;

const PokemonId = styled.span`
  font-size: 1.25rem;
  font-weight: bold;
  color: var(--muted-foreground);
`;

const ImageContainer = styled.div`
  background: var(--background);
  border-radius: var(--radius);
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  border: 1px solid var(--border);
`;

const TypeBadge = styled.span`
  padding: 0.25rem 1rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 500;
  color: white;
  margin-right: 0.5rem;
`;

const StatLabel = styled.span`
  font-size: 0.875rem;
  text-transform: capitalize;
`;

const StatValue = styled.span`
  font-size: 0.875rem;
  font-weight: 500;
`;

const ProgressBar = styled.div<{ $value: number }>`
  width: 100%;
  height: 0.5rem;
  background-color: var(--muted);
  border-radius: 9999px;
  overflow: hidden;
  
  &::after {
    content: '';
    display: block;
    height: 100%;
    width: ${props => props.$value}%;
    background-color: var(--primary);
    transition: width 0.3s ease;
  }
`;

const Section = styled.div`
  margin-bottom: 1.5rem;
  padding: 1.5rem;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--background);
`;

const SectionTitle = styled.h3`
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const AbilityBadge = styled.span`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  background-color: var(--secondary);
  color: var(--secondary-foreground);
  border-radius: var(--radius);
  font-size: 0.875rem;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
  text-transform: capitalize;
  border: 1px solid var(--border);
`;

interface PokemonDetailsProps {
  name: string;
  url: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function PokemonDetailsDialog({
  name,
  url,
  open,
  onOpenChange,
}: PokemonDetailsProps) {
  const { data: details, isLoading } = usePokemonDetails(name, url, open);

  if (!open) return null;

  const mainType = details?.types[0]?.type?.name || "normal";

  return (
    <Dialog onClick={() => onOpenChange(false)}>
      <DialogContent onClick={e => e.stopPropagation()}>
        {isLoading || !details ? (
          <div style={{ height: '24rem', backgroundColor: 'var(--muted)', borderRadius: 'var(--radius)' }} />
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>{name}</DialogTitle>
              <PokemonId>#{details.id.toString().padStart(3, "0")}</PokemonId>
            </DialogHeader>

            <ImageContainer>
              <div style={{ position: 'relative', height: '16rem', width: '16rem', margin: '0 auto' }}>
                <Image
                  src={details.sprites.other["official-artwork"].front_default}
                  alt={name}
                  fill
                  style={{ objectFit: 'contain' }}
                  priority
                />
              </div>
            </ImageContainer>

            <Section>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {details.types.map((type) => (
                  <TypeBadge
                    key={type.type.name}
                    className={`${typeColors[type.type.name].medium}`}
                  >
                    {type.type.name}
                  </TypeBadge>
                ))}
              </div>
            </Section>

            <Section style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
              <div>
                <SectionTitle>Height</SectionTitle>
                <p>{(details.height / 10).toFixed(1)} m</p>
              </div>
              <div>
                <SectionTitle>Weight</SectionTitle>
                <p>{(details.weight / 10).toFixed(1)} kg</p>
              </div>
            </Section>

            <Section>
              <SectionTitle>Abilities</SectionTitle>
              <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {details.abilities.map((ability) => (
                  <AbilityBadge key={ability.ability.name}>
                    {ability.ability.name.replace("-", " ")}
                  </AbilityBadge>
                ))}
              </div>
            </Section>

            <Section>
              <SectionTitle>Base Stats</SectionTitle>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {details.stats.map((stat) => (
                  <div key={stat.stat.name}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                      <StatLabel>{stat.stat.name.replace("-", " ")}</StatLabel>
                      <StatValue>{stat.base_stat}</StatValue>
                    </div>
                    <ProgressBar $value={(stat.base_stat / 255) * 100} />
                  </div>
                ))}
              </div>
            </Section>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}