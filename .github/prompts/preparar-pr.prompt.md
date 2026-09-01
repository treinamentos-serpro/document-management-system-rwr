---
description: Prepara um resumo objetivo para Pull Request com contexto, mudanças e validação.
name: preparar-pr
argument-hint: objetivo da PR (ex. corrigir upload de documento)
agent: agent
---

# Preparar resumo de Pull Request

Com base no objetivo `${input:objetivo:objetivo da PR}`, gere um resumo de PR em português com:

1. Contexto do problema
2. Principais alterações implementadas
3. Como validar (testes/comandos executados)
4. Riscos e pontos de atenção
