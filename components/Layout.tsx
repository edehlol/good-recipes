import { Anchor, AppShell, Button, Container, Group, Header, Text } from '@mantine/core';
import { NextLink } from '@mantine/next';
import { useSession, signIn, signOut } from 'next-auth/react';

const HEADER_HEIGHT = 60;

interface Props {
  children: React.ReactNode;
}
export default function Layout({ children }: Props) {
  const { data: session } = useSession();
  return (
    <AppShell
      header={
        <Header height={60}>
          <Container fluid>
            <Group position="apart" sx={{ height: HEADER_HEIGHT }}>
              <Anchor href="/" size="xl">
                Good Recipes
              </Anchor>

              {session ? (
                <Group>
                  <Anchor component={NextLink} href="/">
                    My Recipes
                  </Anchor>
                  <Group>
                    <Text>Welcome, {session.user?.name}</Text>
                    <Button onClick={() => signOut()} color="red">
                      Sign out
                    </Button>
                  </Group>
                </Group>
              ) : (
                <Button onClick={() => signIn()}>Sign in</Button>
              )}
            </Group>
          </Container>
        </Header>
      }
    >
      {children}
    </AppShell>
  );
}
