// Funções para consumir a API de usuários

export async function getAllUsers() {
  const response = await fetch("/api/users");
  if (!response.ok) throw new Error("Erro ao buscar usuários");
  return response.json();
}

export async function getTeamMembers() {
  const response = await fetch("/api/team-members");
  if (!response.ok) throw new Error("Erro ao buscar membros da equipe");
  return response.json();
}

export async function addTeamMember(user) {
  const response = await fetch("/api/team-members", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  if (!response.ok) throw new Error("Erro ao adicionar membro");
  return response.json();
}

export async function removeTeamMember(id) {
  const response = await fetch(`/api/team-members/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Erro ao remover membro");
  return response.json();
}

