"use client";

import Image from "next/image";

export default function Home() {
  return (
    <div className="font-display text-slate-900 bg-background-light">
      <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden">
        <div className="layout-container flex h-full grow flex-col">
          {/* Navigation */}
          <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-primary/10 px-6 md:px-20 py-4 bg-white/80 backdrop-blur-md sticky top-0 z-50">
            <div className="flex items-center gap-2 text-primary">
              <div className="size-8">
                <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                  <path d="M24 45.8096C19.6865 45.8096 15.4698 44.5305 11.8832 42.134C8.29667 39.7376 5.50128 36.3314 3.85056 32.3462C2.19985 28.361 1.76794 23.9758 2.60947 19.7452C3.451 15.5145 5.52816 11.6284 8.57829 8.5783C11.6284 5.52817 15.5145 3.45101 19.7452 2.60948C23.9758 1.76795 28.361 2.19986 32.3462 3.85057C36.3314 5.50129 39.7376 8.29668 42.134 11.8833C44.5305 15.4698 45.8096 19.6865 45.8096 24L24 24L24 45.8096Z" fill="currentColor"></path>
                </svg>
              </div>
              <h2 className="text-slate-900 text-xl font-bold leading-tight tracking-tight">Nucleo IA</h2>
            </div>
            <div className="hidden md:flex flex-1 justify-end gap-8 items-center">
              <nav className="flex items-center gap-8">
                <a className="text-slate-700 hover:text-primary transition-colors text-sm font-medium" href="#software-house">Consultoria</a>
                <a className="text-slate-700 hover:text-primary transition-colors text-sm font-medium" href="#plataforma">Plataforma</a>
                {/* <a className="text-slate-700 hover:text-primary transition-colors text-sm font-medium" href="#">Cases</a> */}
              </nav>
              <button
                className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-6 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
                onClick={() => window.open('https://wa.me/5548996536876?text=Olá! Gostaria de falar com um especialista.', '_blank')}
              >
                Falar com Especialista
              </button>
            </div>
            <button className="md:hidden text-slate-700 p-2">
              <span className="material-symbols-outlined text-3xl">menu</span>
            </button>
          </header>

          <main className="flex-1">
            {/* Hero Section */}
            <section className="relative overflow-hidden pt-24 pb-32 px-6 md:px-20 min-h-[90vh] flex items-center bg-white">
              <div className="absolute top-1/4 -left-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl mix-blend-multiply"></div>
              <div className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] mix-blend-multiply pointer-events-none"></div>

              <div className="max-w-[1280px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center relative z-10">
                <div className="flex flex-col items-start text-left max-w-2xl">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-8 border border-primary/20">
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                    Inteligência Artificial Aplicada
                  </div>

                  <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 mb-8 leading-[1.1] tracking-tight">
                    <span className="block text-slate-900">Acelere seus</span>
                    <span className="block mt-2 text-primary">resultados com IA</span>
                  </h1>

                  <p className="text-lg md:text-xl text-slate-600 mb-10 leading-relaxed max-w-xl">
                    Transformamos dados complexos em insights acionáveis e otimizamos processos de negócio através de Modelos de Linguagem (LLMs) e soluções de Data Science sob medida.
                  </p>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto">
                    <button
                      className="bg-primary text-white w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-lg hover:bg-primary/90 transition-colors shadow-lg shadow-primary/30 flex items-center justify-center gap-2 group"
                      onClick={() => window.open('https://wa.me/5548996536876?text=Olá! Gostaria de agendar um diagnóstico.', '_blank')}
                    >
                      Agendar Diagnóstico
                      <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
                    </button>
                    {/* <button className="bg-white border-2 border-slate-200 text-slate-700 w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-lg hover:border-slate-300 hover:bg-slate-50 transition-colors flex items-center justify-center gap-2">
                      Conhecer Plataforma
                    </button> */}
                  </div>
                </div>

                <div className="relative w-full h-[600px] flex items-center justify-center hidden lg:flex">
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-full blur-3xl opacity-50"></div>

                  <div className="relative w-full max-w-lg bg-white p-6 rounded-3xl shadow-2xl border border-slate-100 z-10 animate-[float_6s_ease-in-out_infinite]">
                    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                      <div className="w-3 h-3 rounded-full bg-red-400"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                      <div className="w-3 h-3 rounded-full bg-green-400"></div>
                      <span className="ml-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">Dashboard IA</span>
                    </div>

                    <div className="space-y-6">
                      <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
                        <div className="p-2 bg-primary/10 text-primary rounded-lg">
                          <span className="material-symbols-outlined">query_stats</span>
                        </div>
                        <div className="w-full">
                          <h4 className="text-sm font-bold text-slate-800 mb-1">Previsão de Demanda Varejo</h4>
                          <p className="text-xs text-slate-500">Modelo treinado com 5 anos de dados históricos</p>
                          <div className="mt-3 h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                            <div className="h-full bg-primary w-3/4 rounded-full"></div>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 rounded-xl bg-white border border-slate-100 shadow-sm flex flex-col justify-between">
                          <span className="text-xs text-slate-500 font-medium mb-2">Acurácia do Modelo</span>
                          <span className="text-2xl font-black text-slate-800">94.8%</span>
                          <span className="text-xs text-green-500 font-bold mt-2 flex items-center gap-1">
                            <span className="material-symbols-outlined text-[10px]">trending_up</span>
                            +2.4% vs Baseline
                          </span>
                        </div>
                        <div className="p-4 rounded-xl bg-slate-900 text-white shadow-sm flex flex-col justify-between relative overflow-hidden">
                          <div className="absolute top-0 right-0 p-2 opacity-20">
                            <span className="material-symbols-outlined text-4xl">savings</span>
                          </div>
                          <span className="text-xs text-slate-400 font-medium mb-2 relative z-10">Economia Gerada</span>
                          <span className="text-2xl font-black text-white relative z-10">R$ 1.2M</span>
                          <span className="text-xs text-green-400 font-bold mt-2 flex items-center gap-1 relative z-10">
                            Em 6 meses de op.
                          </span>
                        </div>
                      </div>

                      <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-primary shadow-sm shrink-0">
                          <span className="material-symbols-outlined text-sm">auto_awesome</span>
                        </div>
                        <p className="text-xs text-slate-600 font-medium leading-relaxed">
                          <strong className="text-slate-900 block mb-0.5">Insight Automático:</strong>
                          Estoque na região Sul pode ser reduzido em 15% na próxima quinzena sem impacto em vendas.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Software House Section */}
            <section className="py-12 px-6 md:px-20 bg-white" id="software-house">
              <div className="max-w-[1280px] mx-auto">
                <div className="text-center max-w-3xl mx-auto mb-16">
                  <h2 className="text-primary font-bold text-sm uppercase tracking-widest mb-3">Software House de IA</h2>
                  <h3 className="text-3xl md:text-4xl font-bold mb-4">Construímos a inteligência por trás do seu negócio</h3>
                  <p className="text-slate-600 max-w-2xl text-lg mx-auto">Unimos expertise técnica e visão de negócio para implementar soluções de IA que geram ROI real.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Discovery */}
                  <div className="group p-8 rounded-2xl border border-slate-100 bg-background-light hover:border-primary/30 transition-all hover:shadow-xl hover:shadow-primary/5">
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-all">
                      <span className="material-symbols-outlined text-3xl">lightbulb</span>
                    </div>
                    <h4 className="text-xl font-bold text-slate-900 mb-3">Discovery &amp; Estratégia</h4>
                    <p className="text-slate-600 leading-relaxed">Mapeamos processos e identificamos as melhores oportunidades de aplicação de IA para maximizar resultados operacionais.</p>
                  </div>

                  {/* LLM Ops */}
                  <div className="group p-8 rounded-2xl border border-slate-100 bg-background-light hover:border-primary/30 transition-all hover:shadow-xl hover:shadow-primary/5">
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-all">
                      <span className="material-symbols-outlined text-3xl">rocket_launch</span>
                    </div>
                    <h4 className="text-xl font-bold text-slate-900 mb-3">LLM Ops</h4>
                    <p className="text-slate-600 leading-relaxed">Desenvolvimento, ajuste fino (Fine-tuning) e deploy escalável de modelos de linguagem de grande porte em ambiente seguro.</p>
                  </div>

                  {/* Automation */}
                  <div className="group p-8 rounded-2xl border border-slate-100 bg-background-light hover:border-primary/30 transition-all hover:shadow-xl hover:shadow-primary/5">
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-all">
                      <span className="material-symbols-outlined text-3xl">robot_2</span>
                    </div>
                    <h4 className="text-xl font-bold text-slate-900 mb-3">Automation Agents</h4>
                    <p className="text-slate-600 leading-relaxed">Criação de agentes autônomos que realizam tarefas complexas, desde atendimento ao cliente até análises técnicas profundas.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Platform Section */}
            <section className="py-20 px-6 md:px-20 bg-background-light overflow-hidden" id="plataforma">
              <div className="max-w-[1280px] mx-auto">
                <div className="flex flex-col lg:flex-row gap-16 items-center">
                  <div className="lg:w-1/2 order-2 lg:order-1">
                    <div className="relative bg-white p-4 rounded-2xl shadow-2xl border border-primary/10">
                      <div className="bg-slate-50 rounded-lg p-6 min-h-[400px]">
                        <div className="flex items-center gap-4 mb-8 border-b border-slate-200 pb-4">
                          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white">
                            <span className="material-symbols-outlined">forum</span>
                          </div>
                          <div>
                            <p className="text-xs text-slate-500 font-bold uppercase">Chat Insights</p>
                            <p className="text-sm font-bold text-slate-800">Analista de Dados IA</p>
                          </div>
                        </div>

                        <div className="space-y-6">
                          <div className="flex justify-end">
                            <div className="bg-primary/10 text-slate-800 p-3 rounded-2xl rounded-tr-none max-w-[80%] text-sm">
                              Qual foi o faturamento por região no último trimestre?
                            </div>
                          </div>

                          <div className="flex justify-start items-start gap-2">
                            <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 shrink-0">
                              <span className="material-symbols-outlined text-xs">smart_toy</span>
                            </div>
                            <div className="bg-white border border-slate-200 p-3 rounded-2xl rounded-tl-none max-w-[90%] shadow-sm w-full">
                              <p className="text-sm text-slate-700 mb-2">Entendido. Executando query SQL nos bancos de produção...</p>
                              <div className="bg-slate-900 rounded-lg p-3 text-[10px] text-green-400 font-mono mb-2 overflow-x-auto">
                                SELECT region, SUM(revenue) FROM sales WHERE date &gt;= '2023-10-01' GROUP BY region;
                              </div>
                              <p className="text-sm text-slate-700 font-bold">Resultados: SP (R$ 1.2M), RJ (R$ 840k), MG (R$ 620k).</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Tooltip/Floating UI elements */}
                      <div className="absolute -right-8 top-1/4 bg-white p-3 rounded-lg shadow-lg border border-slate-100 flex items-center gap-3 animate-bounce">
                        <span className="material-symbols-outlined text-green-500">check_circle</span>
                        <span className="text-xs font-bold text-slate-800">Conexão SQL ativa</span>
                      </div>
                    </div>
                  </div>

                  <div className="lg:w-1/2 order-1 lg:order-2">
                    <h2 className="text-primary font-bold text-sm uppercase tracking-widest mb-2">Plataforma de Insights SaaS</h2>
                    <h3 className="text-slate-900 text-3xl md:text-5xl font-extrabold mb-6 leading-tight">Converse com seus dados como se fosse um humano</h3>

                    <div className="space-y-6">
                      <div className="flex items-start gap-4">
                        <div className="bg-primary/10 p-2 rounded-lg text-primary shrink-0">
                          <span className="material-symbols-outlined">database</span>
                        </div>
                        <div>
                          <h4 className="text-lg font-bold text-slate-900">NLP to SQL Chat</h4>
                          <p className="text-slate-600">Elimine a barreira técnica. Peça relatórios complexos em linguagem natural e receba dados processados instantaneamente.</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="bg-primary/10 p-2 rounded-lg text-primary shrink-0">
                          <span className="material-symbols-outlined">account_tree</span>
                        </div>
                        <div>
                          <h4 className="text-lg font-bold text-slate-900">Análise Multi-formato</h4>
                          <p className="text-slate-600">Integre CSVs, PDFs, Planilhas e bancos de dados SQL em uma única interface inteligente de busca e análise.</p>
                        </div>
                      </div>

                      {/* <div className="pt-4">
                        <button className="flex items-center gap-2 text-primary font-bold group">
                          Ver demonstração da plataforma
                          <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                        </button>
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-6 md:px-20 bg-white">
              <div className="max-w-[1280px] mx-auto bg-primary rounded-3xl p-8 md:p-16 flex flex-col md:flex-row items-center justify-between gap-10 text-white relative overflow-hidden shadow-2xl shadow-primary/40">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full -ml-24 -mb-24 blur-2xl"></div>

                <div className="relative z-10 max-w-xl text-center md:text-left">
                  <h2 className="text-3xl md:text-5xl font-black mb-6">Pronto para liderar a era da IA?</h2>
                  <p className="text-white/90 text-lg font-medium">Junte-se a dezenas de empresas que já otimizaram seus fluxos de trabalho com a Nucleo IA.</p>
                </div>

                <div className="relative z-10 shrink-0">
                  <button className="bg-white text-primary font-black py-4 px-10 rounded-xl text-lg hover:scale-105 transition-transform shadow-xl">
                    Solicitar Diagnóstico Grátis
                  </button>
                </div>
              </div>
            </section>
          </main>

          {/* Footer */}
          <footer className="bg-white border-t border-slate-100 py-16 px-6 md:px-20 mt-12">
            {/* <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
              <div className="col-span-1 md:col-span-1">
                <div className="flex items-center gap-2 text-primary mb-6">
                  <div className="size-6">
                    <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                      <path d="M24 45.8096C19.6865 45.8096 15.4698 44.5305 11.8832 42.134C8.29667 39.7376 5.50128 36.3314 3.85056 32.3462C2.19985 28.361 1.76794 23.9758 2.60947 19.7452C3.451 15.5145 5.52816 11.6284 8.57829 8.5783C11.6284 5.52817 15.5145 3.45101 19.7452 2.60948C23.9758 1.76795 28.361 2.19986 32.3462 3.85057C36.3314 5.50129 39.7376 8.29668 42.134 11.8833C44.5305 15.4698 45.8096 19.6865 45.8096 24L24 24L24 45.8096Z" fill="currentColor"></path>
                    </svg>
                  </div>
                  <span className="text-slate-900 font-bold text-lg">Nucleo IA</span>
                </div>
                <p className="text-slate-500 text-sm leading-relaxed">Acelerando a transformação digital através da Inteligência Artificial aplicada e análise estratégica de dados.</p>
              </div>

              <div>
                <h5 className="text-slate-900 font-bold mb-6">Soluções</h5>
                <ul className="space-y-4 text-sm text-slate-500">
                  <li><a className="hover:text-primary transition-colors" href="#">LLM Ops</a></li>
                  <li><a className="hover:text-primary transition-colors" href="#">Insights SaaS</a></li>
                  <li><a className="hover:text-primary transition-colors" href="#">Agentes de IA</a></li>
                  <li><a className="hover:text-primary transition-colors" href="#">Data Science</a></li>
                </ul>
              </div>

              <div>
                <h5 className="text-slate-900 font-bold mb-6">Empresa</h5>
                <ul className="space-y-4 text-sm text-slate-500">
                  <li><a className="hover:text-primary transition-colors" href="#">Sobre Nós</a></li>
                  <li><a className="hover:text-primary transition-colors" href="#">Carreiras</a></li>
                  <li><a className="hover:text-primary transition-colors" href="#">Blog</a></li>
                  <li><a className="hover:text-primary transition-colors" href="#">Contato</a></li>
                </ul>
              </div>

              <div>
                <h5 className="text-slate-900 font-bold mb-6">Newsletter</h5>
                <p className="text-slate-500 text-sm mb-4">Receba novidades sobre IA no seu e-mail.</p>
                <div className="flex gap-2">
                  <input className="bg-background-light border border-slate-200 rounded-lg text-sm flex-1 focus:ring-primary focus:border-primary p-2" placeholder="Seu e-mail" type="email" />
                  <button className="bg-primary text-white p-2 rounded-lg px-4 font-bold text-sm">OK</button>
                </div>
              </div>
            </div> */}

            <div className="max-w-[1280px] mx-auto border-t border-slate-100 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-400 text-xs">
              <p>© 2026 Nucleo IA. Todos os direitos reservados.</p>
              {/* <div className="flex gap-8">
                <a className="hover:text-slate-600 transition-colors" href="#">Termos de Uso</a>
                <a className="hover:text-slate-600 transition-colors" href="#">Privacidade</a>
              </div> */}
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
