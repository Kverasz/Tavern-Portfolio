from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List
import httpx

app = FastAPI(title="API Taverna Digital", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

GITHUB_USERNAME = "Kverasz"  # Seu usuario do GitHub

# 1. LISTA DE REPOSITÓRIOS EXIBIDOS (Coloque apenas os nomes exatos do GitHub)
PROJETOS_PERMITIDOS = [
    "OPI",
    "Oraculum-BB-Squad04",
    "Projeto-Clash-Royale",
    
]

# 2. PERSONALIZAÇÃO INDIVIDUAL (Altere o que quiser exibir no site)
CUSTOMIZACOES = {
    "OPI": {
        "titulo": "OPI",
        "descricao": "Sistema web para gerenciar os Projetos Integradores do SENAC Pernambuco, desde a submissão e avaliação até a divulgação e conexão com empresas.",
        "tags": ["React + Vite + TypeScript", "Tailwind CSS", "Python", "Django", "PostgreSQL"],
        "linkDemo": "https://opi-gamma.vercel.app/"  # Cole a URL da demo aqui se houver
    },
    "Oraculum-BB-Squad04": {
        "titulo": "Oraculum BB",
        "descricao": "O Oraculum BB é uma plataforma de quiz interativo que avalia o conhecimento em cibersegurança do usuário e classifica seu nível em Júnior, Pleno ou Sênior, orientando sua evolução com feedback imediato.",
        "tags": ["React + Vite + TypeScript", "Tailwind CSS", "Firebase Firestore", "Firebase Authentication"],
        "linkDemo": "https://oraculum-bb-squad04-omaq.vercel.app/login"
    },
    "Projeto-Clash-Royale": {
        "titulo": "Cartas Clash Royale",
        "descricao": "Este é um sistema para gerenciar cartas personalizadas no estilo Clash Royale. O sistema permite criar cartas, exibir cartas, selecionar cartas predefinidas, listar cartas criadas e remover cartas do banco.",
        "tags": ["Python", "PyQt5", "SQLite3", "QPixmap", "Qt Widgets"],
        "linkDemo": ""
    }
}

AVALIACOES_DATABASE = [
    {
        "id": 1,
        "nome": "O Taverneiro",
        "cargo": "Estudante",
        "comentario": "Exemplo de avaliação!",
        "estrelas": 5
    }
]

class MensagemContato(BaseModel):
    nome: str
    email: str
    mensagem: str

class NovaAvaliacao(BaseModel):
    nome: str
    cargo: str = "Visitante"
    comentario: str
    estrelas: int = Field(ge=1, le=5)

@app.get("/")
def home():
    return {"status": "Taverna online!", "mensagem": "Bem-vindo à API do portfólio."}

@app.get("/api/projetos")
async def obter_projetos_github():
    url = f"https://api.github.com/users/{GITHUB_USERNAME}/repos?sort=updated&per_page=30"
    
    async with httpx.AsyncClient() as client:
        try:
            resposta = await client.get(url)
            
            if resposta.status_code != 200:
                raise HTTPException(
                    status_code=resposta.status_code, 
                    detail="Erro ao buscar repositórios no GitHub"
                )
            
            repositorios = resposta.json()
            projetos_formatados = []

            for repo in repositorios:
                nome_repo = repo.get("name")
                
                # Exibe apenas os repositórios definidos na lista PROJETOS_PERMITIDOS
                if nome_repo in PROJETOS_PERMITIDOS:
                    custom = CUSTOMIZACOES.get(nome_repo, {})
                    
                    projetos_formatados.append({
                        "id": repo.get("id"),
                        "titulo": custom.get("titulo", nome_repo),
                        "descricao": custom.get("descricao", repo.get("description") or "Projeto do GitHub."),
                        "tags": custom.get("tags", [repo.get("language")] if repo.get("language") else ["Código"]),
                        "linkGithub": repo.get("html_url"),
                        "linkDemo": custom.get("linkDemo", repo.get("homepage") or ""),
                        "estrelas": repo.get("stargazers_count", 0)
                    })
            
            return projetos_formatados

        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/contato")
def enviar_mensagem(contato: MensagemContato):
    print(f"Carta Recebida!")
    print(f"Nome: {contato.nome}")
    print(f"Email: {contato.email}")
    print(f"Mensagem: {contato.mensagem}")
    
    return {
        "sucesso": True,
        "mensagem": "Carta entregue com sucesso ao taverneiro!"
    }

# Endpoints do Mural de Avaliações
@app.get("/api/avaliacoes")
def listar_avaliacoes():
    return AVALIACOES_DATABASE

@app.post("/api/avaliacoes")
def criar_avaliacao(avaliacao: NovaAvaliacao):
    nova = {
        "id": len(AVALIACOES_DATABASE) + 1,
        "nome": avaliacao.nome,
        "cargo": avaliacao.cargo if avaliacao.cargo else "Visitante da Taverna",
        "comentario": avaliacao.comentario,
        "estrelas": avaliacao.estrelas
    }
    AVALIACOES_DATABASE.insert(0, nova)  # Insere no início para mostrar as mais recentes primeiro
    return {"sucesso": True, "avaliacao": nova}