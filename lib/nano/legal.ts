// Texts of the Nanno privacy policy and terms of use (pt-BR and en).
// Keep them in sync with what the app and the site really do: src/agent (desktop) and lib/nano (site).

export const LEGAL_UPDATED = "2026-10-23";
export const LEGAL_CONTACT = "contato@hanno.com.br";

export type LegalSection = { h: string; p: string[] };
export type LegalDoc = { title: string; intro: string; sections: LegalSection[] };
type Locale = "pt-BR" | "en";

const C = LEGAL_CONTACT;

const PRIVACY: Record<Locale, LegalDoc> = {
  "pt-BR": {
    title: "Política de Privacidade do Nanno",
    intro:
      "O Nanno é um assistente para o computador feito pela Hanno Tech (\"nós\"). Ele foi pensado para que suas conversas fiquem no seu computador. Esta política explica quais dados tratamos, por quê, com quem e quais são os seus direitos, de acordo com a Lei Geral de Proteção de Dados (LGPD).",
    sections: [
      {
        h: "1. Quem é o responsável",
        p: [`A Hanno Tech é a controladora dos dados tratados pelo site hanno.com.br/nanno e pela conta do Nanno. Para qualquer assunto de privacidade, inclusive falar com o encarregado de dados, escreva para ${C}.`],
      },
      {
        h: "2. O que fica só no seu computador",
        p: [
          "Conversas, diário, lembretes, preferências, arquivos que o Nanno cria e as chaves de API que você cadastra ficam no seu computador. As chaves e os acessos a apps conectados são cifrados com o cofre do próprio sistema operacional.",
          "A voz é processada no seu computador: o que você fala é transcrito localmente e a voz do Nanno também é gerada localmente. Nada disso é enviado para a Hanno.",
        ],
      },
      {
        h: "3. O que coletamos",
        p: [
          "Lista de espera: e-mail, idioma, origem da visita e código de indicação.",
          "Conta: e-mail, códigos de acesso de uso único (guardamos só um resumo criptográfico, que vence em 10 minutos), um identificador de cada computador conectado (também guardado só como resumo criptográfico) e a data do último acesso.",
          "Compras: o pagamento é processado pelo Stripe. Recebemos o e-mail, o plano, a situação do pagamento ou da assinatura, o valor, a moeda, o idioma do checkout e identificadores do Stripe. Não vemos nem guardamos dados do seu cartão.",
          "E-mails: registramos quais e-mails do Nanno já enviamos para você (para não repetir) e se você pediu para não receber mais avisos.",
        ],
      },
      {
        h: "4. Para que usamos e com qual base legal",
        p: [
          "Para liberar o app para quem tem um plano ativo, confirmar compras e assinaturas, enviar e-mails necessários (código de acesso, confirmação de compra, link de download) e dar suporte: execução de contrato.",
          "Para avisos sobre o lançamento e a pré-venda a quem entrou na lista de espera: consentimento, que você pode retirar a qualquer momento pelo link no fim de cada e-mail.",
          "Para prevenir fraude e abuso e manter os sistemas seguros: legítimo interesse. Para guardar registros de vendas: cumprimento de obrigação legal.",
          "Não vendemos seus dados e não os usamos para publicidade de terceiros.",
        ],
      },
      {
        h: "5. A sua IA e os serviços que você conecta",
        p: [
          "O Nanno usa a inteligência artificial que você escolhe: uma chave de API sua (Anthropic, OpenAI, Google Gemini, DeepSeek, xAI, Mistral ou Alibaba Qwen), o Claude Code instalado no seu computador ou um modelo local (Ollama). O texto das conversas e os resultados das ferramentas vão diretamente do seu computador para esse provedor, sob os termos e a política de privacidade dele. A Hanno não recebe nem intermedeia esse conteúdo.",
          "O mesmo vale para os serviços que você conectar: buscas na web (Tavily ou Brave), páginas que o Nanno lê a seu pedido, Notion e outros servidores MCP. A comunicação é direta entre o seu computador e o serviço, e os acessos ficam cifrados no seu computador.",
        ],
      },
      {
        h: "6. Dados do Google",
        p: [
          "Se você conectar sua conta Google, o Nanno pede somente o seu e-mail e a permissão \"drive.file\", que dá acesso apenas aos arquivos que o Nanno cria ou que você abre com ele, nunca ao seu Google Drive inteiro.",
          "Usamos esse acesso somente para fazer o que você pede: criar documentos, planilhas e apresentações, listá-los, lê-los e acrescentar conteúdo a eles. Os acessos ficam cifrados no seu computador e os dados do Google não são enviados para a Hanno. Para atender ao seu pedido, o texto desses arquivos pode ser enviado ao provedor de IA que você escolheu.",
          "Os dados recebidos das APIs do Google não são vendidos, não são usados para publicidade e não são usados para criar, treinar ou melhorar modelos de inteligência artificial genéricos.",
          "O uso e a transferência, pelo Nanno, de informações recebidas das APIs do Google para qualquer outro app seguirão a Política de Dados do Usuário dos Serviços de API do Google (Google API Services User Data Policy), incluindo os requisitos de Uso Limitado.",
          "Você pode desconectar a qualquer momento em Ajustes → Conexões no Nanno ou em myaccount.google.com/permissions.",
        ],
      },
      {
        h: "7. Com quem compartilhamos",
        p: [
          "Só com os fornecedores que fazem o serviço funcionar, como operadores de dados: Stripe (pagamentos), Neon (banco de dados), Netlify (hospedagem do site), Resend (envio de e-mails) e GitHub (hospedagem do instalador). Alguns ficam fora do Brasil, principalmente nos Estados Unidos; nesses casos a transferência segue as salvaguardas previstas na LGPD.",
          "Também podemos compartilhar dados quando a lei ou uma autoridade exigir.",
        ],
      },
      {
        h: "8. Por quanto tempo guardamos",
        p: [
          "Conta e compras: enquanto sua conta existir e, depois, pelo prazo exigido pela legislação fiscal e de consumo. Códigos de acesso: até serem usados ou vencerem. Lista de espera: até você pedir para sair ou até o fim do lançamento, o que vier primeiro. Registro de e-mails enviados: enquanto for útil para não repetir envios.",
        ],
      },
      {
        h: "9. Seus direitos",
        p: [
          `Você pode pedir confirmação de que tratamos seus dados, acesso, correção, anonimização, portabilidade, exclusão, informações sobre com quem compartilhamos e a revogação do consentimento. Escreva para ${C}; respondemos em até 15 dias. Você também pode reclamar à Autoridade Nacional de Proteção de Dados (ANPD).`,
        ],
      },
      {
        h: "10. Segurança",
        p: [
          "Usamos conexões cifradas, guardamos códigos e identificadores só como resumos criptográficos, assinamos digitalmente as licenças do app e ciframos no seu computador as chaves e acessos que você cadastra. Nenhum sistema é totalmente imune; se acontecer um incidente relevante, avisaremos você e a ANPD conforme a lei.",
        ],
      },
      {
        h: "11. Crianças e adolescentes",
        p: ["O Nanno não é destinado a menores de 13 anos. Adolescentes devem usá-lo com o consentimento e o acompanhamento dos pais ou responsáveis."],
      },
      {
        h: "12. Mudanças nesta política",
        p: ["Podemos atualizar esta política. Mudanças importantes serão avisadas por e-mail ou no app antes de valerem. A data no topo indica a última atualização."],
      },
    ],
  },
  en: {
    title: "Nanno Privacy Policy",
    intro:
      "Nanno is a desktop assistant made by Hanno Tech (\"we\"). It was designed so your conversations stay on your computer. This policy explains what data we process, why, with whom, and your rights, including under Brazil's General Data Protection Law (LGPD).",
    sections: [
      {
        h: "1. Who is responsible",
        p: [`Hanno Tech is the controller of the data processed by hanno.com.br/nanno and by Nanno accounts. For any privacy matter, including reaching our data protection officer, write to ${C}.`],
      },
      {
        h: "2. What stays on your computer",
        p: [
          "Conversations, journal, reminders, preferences, files Nanno creates and the API keys you add stay on your computer. Keys and access to connected apps are encrypted with your operating system's own vault.",
          "Voice is processed on your computer: what you say is transcribed locally and Nanno's voice is also generated locally. None of it is sent to Hanno.",
        ],
      },
      {
        h: "3. What we collect",
        p: [
          "Waitlist: e-mail, language, visit source and referral code.",
          "Account: e-mail, single-use sign-in codes (we only keep a cryptographic hash, which expires in 10 minutes), an identifier for each connected computer (also stored only as a hash) and the last access date.",
          "Purchases: payments are processed by Stripe. We receive the e-mail, plan, payment or subscription status, amount, currency, checkout language and Stripe identifiers. We never see or store your card details.",
          "E-mails: we record which Nanno e-mails we've already sent you (so we don't repeat them) and whether you asked to stop receiving announcements.",
        ],
      },
      {
        h: "4. Why we use it and on what legal basis",
        p: [
          "To unlock the app for people with an active plan, confirm purchases and subscriptions, send necessary e-mails (sign-in code, purchase confirmation, download link) and provide support: performance of a contract.",
          "To send launch and presale announcements to people on the waitlist: consent, which you can withdraw at any time using the link at the bottom of every e-mail.",
          "To prevent fraud and abuse and keep our systems secure: legitimate interest. To keep sales records: legal obligation.",
          "We don't sell your data or use it for third-party advertising.",
        ],
      },
      {
        h: "5. Your AI and the services you connect",
        p: [
          "Nanno uses the artificial intelligence you choose: your own API key (Anthropic, OpenAI, Google Gemini, DeepSeek, xAI, Mistral or Alibaba Qwen), Claude Code installed on your computer, or a local model (Ollama). Conversation text and tool results go directly from your computer to that provider, under its own terms and privacy policy. Hanno doesn't receive or relay that content.",
          "The same applies to services you connect: web search (Tavily or Brave), pages Nanno reads at your request, Notion and other MCP servers. Communication is direct between your computer and the service, and access tokens are encrypted on your computer.",
        ],
      },
      {
        h: "6. Google user data",
        p: [
          "If you connect your Google account, Nanno only requests your e-mail and the \"drive.file\" permission, which gives access only to files Nanno creates or that you open with it, never to your whole Google Drive.",
          "We use this access only to do what you ask: create documents, spreadsheets and presentations, list them, read them and add content to them. Access tokens are encrypted on your computer and Google data is not sent to Hanno. To fulfill your request, the text of those files may be sent to the AI provider you chose.",
          "Data received from Google APIs is not sold, not used for advertising and not used to develop, train or improve generalized artificial intelligence models.",
          "Nanno's use and transfer to any other app of information received from Google APIs will adhere to the Google API Services User Data Policy, including the Limited Use requirements.",
          "You can disconnect at any time in Nanno under Settings → Connections or at myaccount.google.com/permissions.",
        ],
      },
      {
        h: "7. Who we share data with",
        p: [
          "Only with the providers that make the service work, acting as processors: Stripe (payments), Neon (database), Netlify (website hosting), Resend (e-mail delivery) and GitHub (installer hosting). Some are outside Brazil, mainly in the United States; such transfers follow the safeguards required by law.",
          "We may also share data when required by law or by an authority.",
        ],
      },
      {
        h: "8. How long we keep it",
        p: [
          "Account and purchases: while your account exists and then for as long as tax and consumer laws require. Sign-in codes: until used or expired. Waitlist: until you ask to leave or until the launch ends, whichever comes first. Record of sent e-mails: while it's useful to avoid duplicates.",
        ],
      },
      {
        h: "9. Your rights",
        p: [
          `You can ask us to confirm whether we process your data and for access, correction, anonymization, portability, deletion, information about who we share it with, and withdrawal of consent. Write to ${C}; we reply within 15 days. You can also complain to your data protection authority (in Brazil, the ANPD).`,
        ],
      },
      {
        h: "10. Security",
        p: [
          "We use encrypted connections, store codes and identifiers only as cryptographic hashes, digitally sign app licenses, and encrypt on your computer the keys and access tokens you add. No system is completely immune; if a relevant incident happens, we'll notify you and the authorities as the law requires.",
        ],
      },
      {
        h: "11. Children",
        p: ["Nanno is not intended for children under 13. Teenagers should use it with the consent and supervision of a parent or guardian."],
      },
      {
        h: "12. Changes to this policy",
        p: ["We may update this policy. Important changes will be announced by e-mail or in the app before they take effect. The date at the top shows the last update."],
      },
    ],
  },
};

const TERMS: Record<Locale, LegalDoc> = {
  "pt-BR": {
    title: "Termos de Uso do Nanno",
    intro:
      "Estes termos regem o uso do Nanno, assistente para computador da Hanno Tech, e da sua conta. Ao comprar um plano ou usar o app, você concorda com eles e com a nossa Política de Privacidade.",
    sections: [
      {
        h: "1. O que é o Nanno",
        p: [
          "O Nanno é um app para Windows que dá um rosto à inteligência artificial que você escolhe. Ele conversa, ouve e fala, cria documentos e, com a sua permissão, usa apps que você conecta.",
          "O Nanno funciona com um plano ativo: Nanno Plus (mensal ou anual) ou Founder's Pack. Não há plano gratuito.",
        ],
      },
      {
        h: "2. Conta e licença",
        p: [
          "Você ativa o Nanno com o e-mail usado na compra. A licença é pessoal e intransferível, para uso nos seus próprios computadores. Não compartilhe sua conta nem tente contornar a verificação do plano.",
          "Você é responsável por manter o acesso ao seu e-mail seguro e pelo que acontece na sua conta.",
        ],
      },
      {
        h: "3. Planos, pagamentos e renovação",
        p: [
          "Os preços estão em hanno.com.br/nanno, em dólares americanos, e podem incluir impostos conforme o seu país. Os pagamentos são processados pelo Stripe.",
          "As assinaturas do Nanno Plus se renovam automaticamente ao fim de cada período até você cancelar. O cancelamento vale ao fim do período já pago, e o acesso continua até lá.",
          "Podemos mudar preços; mudanças em assinaturas ativas serão avisadas com antecedência e valerão a partir da renovação seguinte.",
        ],
      },
      {
        h: "4. Founder's Pack",
        p: [
          "O Founder's Pack é um pagamento único, limitado a 500 unidades e vendido só na pré-venda. Ele inclui o Nanno Plus enquanto o Nanno for oferecido pela Hanno Tech, uma skin exclusiva que não volta à venda, seu nome nos créditos do app e acesso ao beta.",
        ],
      },
      {
        h: "5. Reembolso de 7 dias",
        p: [
          `Se mudar de ideia, peça o reembolso em até 7 dias da compra respondendo o recibo ou escrevendo para ${C}, sem precisar explicar o motivo. Depois do reembolso, o acesso do plano é encerrado. Isso não afasta os direitos que o Código de Defesa do Consumidor garante a você.`,
        ],
      },
      {
        h: "6. Versão beta",
        p: ["Durante o beta, o Nanno pode ter falhas, mudar de comportamento e ficar indisponível em alguns momentos. Seu retorno ajuda a melhorar o produto."],
      },
      {
        h: "7. Sua IA e serviços de terceiros",
        p: [
          "Você escolhe e contrata a sua IA (por chave de API, Claude Code ou modelo local) e os serviços que conectar, como buscas na web, Google e Notion. O uso deles segue os termos de cada fornecedor, e eventuais custos são cobrados por eles, não pela Hanno.",
          "As respostas são geradas por inteligência artificial e podem conter erros. Confira informações importantes antes de agir com base nelas.",
          "Ações que criam, alteram ou apagam algo nos seus apps conectados pedem sua confirmação antes. Você é responsável pelo que autoriza.",
        ],
      },
      {
        h: "8. Uso aceitável",
        p: [
          "Não use o Nanno para atividades ilegais, para violar direitos de outras pessoas, para enviar spam ou conteúdo malicioso, nem para revender, sublicenciar, copiar ou descompilar o app com o objetivo de contornar a licença.",
        ],
      },
      {
        h: "9. Propriedade intelectual",
        p: [
          "O Nanno, seu personagem, sua marca, skins, vozes e o software pertencem à Hanno Tech. O que você cria com o Nanno é seu.",
          "O app inclui componentes de código aberto, cada um sob a sua própria licença; por exemplo, o eSpeak NG (GPL-3.0) acompanha o Nanno como um programa separado, e o código-fonte dele está disponível nos termos dessa licença.",
        ],
      },
      {
        h: "10. Limitação de responsabilidade",
        p: [
          "Na extensão máxima permitida pela lei, e sem prejuízo dos direitos do consumidor, a Hanno Tech não responde por danos indiretos, por perda de dados ou de lucros, nem por respostas da IA ou falhas de serviços de terceiros. Nossa responsabilidade total fica limitada ao valor que você pagou ao Nanno nos 12 meses anteriores ao fato.",
        ],
      },
      {
        h: "11. Suspensão e encerramento",
        p: ["Você pode parar de usar o Nanno e cancelar a assinatura quando quiser. Podemos suspender ou encerrar contas que violem estes termos, avisando sempre que possível."],
      },
      {
        h: "12. Mudanças nestes termos",
        p: ["Podemos atualizar estes termos. Mudanças importantes serão avisadas por e-mail ou no app antes de valerem."],
      },
      {
        h: "13. Lei aplicável e contato",
        p: [`Estes termos seguem as leis do Brasil. Para consumidores, vale o foro do seu domicílio. Dúvidas ou suporte: ${C}.`],
      },
    ],
  },
  en: {
    title: "Nanno Terms of Use",
    intro:
      "These terms govern your use of Nanno, Hanno Tech's desktop assistant, and of your account. By buying a plan or using the app, you agree to them and to our Privacy Policy.",
    sections: [
      {
        h: "1. What Nanno is",
        p: [
          "Nanno is a Windows app that gives a face to the artificial intelligence you choose. It chats, listens and speaks, creates documents and, with your permission, uses apps you connect.",
          "Nanno works with an active plan: Nanno Plus (monthly or annual) or the Founder's Pack. There is no free plan.",
        ],
      },
      {
        h: "2. Account and license",
        p: [
          "You activate Nanno with the e-mail used for the purchase. The license is personal and non-transferable, for use on your own computers. Don't share your account or try to bypass the plan check.",
          "You're responsible for keeping access to your e-mail secure and for what happens in your account.",
        ],
      },
      {
        h: "3. Plans, payments and renewal",
        p: [
          "Prices are listed at hanno.com.br/nanno in US dollars and may include taxes depending on your country. Payments are processed by Stripe.",
          "Nanno Plus subscriptions renew automatically at the end of each period until you cancel. Cancellation takes effect at the end of the period already paid, and access continues until then.",
          "We may change prices; changes to active subscriptions will be announced in advance and apply from the next renewal.",
        ],
      },
      {
        h: "4. Founder's Pack",
        p: [
          "The Founder's Pack is a one-time payment, limited to 500 units and sold only during the presale. It includes Nanno Plus for as long as Hanno Tech offers Nanno, an exclusive skin that will never be sold again, your name in the app credits and beta access.",
        ],
      },
      {
        h: "5. 7-day refund",
        p: [
          `If you change your mind, request a refund within 7 days of purchase by replying to your receipt or writing to ${C}, no questions asked. After the refund, the plan's access ends. This doesn't limit any rights consumer law gives you.`,
        ],
      },
      {
        h: "6. Beta version",
        p: ["During the beta, Nanno may have bugs, change behavior and be unavailable at times. Your feedback helps improve the product."],
      },
      {
        h: "7. Your AI and third-party services",
        p: [
          "You choose and contract your AI (API key, Claude Code or local model) and the services you connect, such as web search, Google and Notion. Their use follows each provider's terms, and any costs are charged by them, not by Hanno.",
          "Answers are generated by artificial intelligence and may contain mistakes. Check important information before acting on it.",
          "Actions that create, change or delete something in your connected apps ask for your confirmation first. You're responsible for what you approve.",
        ],
      },
      {
        h: "8. Acceptable use",
        p: [
          "Don't use Nanno for illegal activities, to violate other people's rights, to send spam or malicious content, or to resell, sublicense, copy or decompile the app in order to bypass the license.",
        ],
      },
      {
        h: "9. Intellectual property",
        p: [
          "Nanno, its character, brand, skins, voices and software belong to Hanno Tech. What you create with Nanno is yours.",
          "The app includes open-source components, each under its own license; for example, eSpeak NG (GPL-3.0) ships with Nanno as a separate program, and its source code is available under that license.",
        ],
      },
      {
        h: "10. Limitation of liability",
        p: [
          "To the maximum extent permitted by law, and without prejudice to consumer rights, Hanno Tech is not liable for indirect damages, loss of data or profits, AI answers or failures of third-party services. Our total liability is limited to the amount you paid for Nanno in the 12 months before the event.",
        ],
      },
      {
        h: "11. Suspension and termination",
        p: ["You can stop using Nanno and cancel your subscription at any time. We may suspend or close accounts that violate these terms, giving notice whenever possible."],
      },
      {
        h: "12. Changes to these terms",
        p: ["We may update these terms. Important changes will be announced by e-mail or in the app before they take effect."],
      },
      {
        h: "13. Governing law and contact",
        p: [`These terms are governed by the laws of Brazil, without prejudice to mandatory consumer protections in your country. Questions or support: ${C}.`],
      },
    ],
  },
};

export function legalDoc(kind: "privacy" | "terms", locale: string): LegalDoc {
  const l: Locale = locale.startsWith("pt") ? "pt-BR" : "en";
  return (kind === "privacy" ? PRIVACY : TERMS)[l];
}
