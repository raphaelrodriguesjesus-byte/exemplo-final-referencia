import { useState } from "react";
import { useLocation, useNavigate } from "react-router";

type Page = "home" | "noticias" | "artigos" | "agenda" | "estagios" | "login";

const pagePaths: Record<Page, string> = {
  home: "/",
  noticias: "/noticias",
  artigos: "/artigos",
  agenda: "/agenda",
  estagios: "/oportunidades",
  login: "/area-da-liga",
};

const pagesByPath = Object.fromEntries(
  Object.entries(pagePaths).map(([page, path]) => [path, page]),
) as Record<string, Page>;

const photos = {
  microscope:
    "https://images.unsplash.com/photo-1511174511562-5f7f18b874f8?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1200",
  conference:
    "https://images.unsplash.com/photo-1672866832881-a7c570dd545d?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1200",
  campus:
    "https://images.unsplash.com/photo-1778082073716-804250a63057?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1200",
};

const navItems: { id: Page; label: string }[] = [
  { id: "home", label: "Início" },
  { id: "noticias", label: "Notícias" },
  { id: "artigos", label: "Artigos" },
  { id: "agenda", label: "Agenda" },
  { id: "estagios", label: "Oportunidades" },
];

const news = [
  {
    tag: "Liga Acadêmica",
    tone: "green",
    title: "Resultado do processo seletivo para novos membros 2026.2",
    copy: "Os candidatos aprovados já podem conferir a lista e acessar o cronograma de integração da liga.",
    date: "15 set 2026",
    time: "2 min",
    image: photos.microscope,
  },
  {
    tag: "Congresso",
    tone: "teal",
    title: "Inscrições abertas para o III Congresso de Biomedicina",
    copy: "O evento acontece em novembro e aceita submissão de trabalhos científicos até 20 de outubro.",
    date: "10 set 2026",
    time: "3 min",
    image: photos.conference,
  },
  {
    tag: "Representação",
    tone: "violet",
    title: "Nova sala de estudos colaborativos é inaugurada no campus",
    copy: "O espaço já está disponível para os alunos e conta com estrutura para grupos de pesquisa.",
    date: "08 set 2026",
    time: "4 min",
    image: photos.campus,
  },
];

const articles = [
  {
    area: "Hematologia",
    tone: "green",
    title: "Avaliação de parâmetros hematológicos em pacientes com anemia ferropriva em Goiânia",
    copy: "Estudo do perfil hematológico de 80 pacientes, correlacionando índices eritrocitários com o diagnóstico de anemia ferropriva.",
    meta: "Maria Luiza Fonseca, Beatriz Alves · Prof. Dr. Carlos Menezes · 2026",
  },
  {
    area: "Microbiologia",
    tone: "teal",
    title: "Resistência antimicrobiana em cepas de Staphylococcus aureus",
    copy: "Análise de perfis de resistência de cepas isoladas em ambiente hospitalar, com foco em MRSA.",
    meta: "João Pedro Lima, Carla Nascimento · 2025",
  },
  {
    area: "Genética",
    tone: "violet",
    title: "Polimorfismos do gene BRCA1 e risco de câncer de mama",
    copy: "Revisão sistemática sobre variantes patogênicas em populações do Centro-Oeste brasileiro.",
    meta: "Ana Flávia Reis · Profa. Dra. Renata Borges · 2026",
  },
  {
    area: "Bioquímica",
    tone: "orange",
    title: "Marcadores bioquímicos de lesão renal em pacientes diabéticos tipo 2",
    copy: "Estudo avaliando creatinina, ureia e cistatina C como preditores precoces de nefropatia.",
    meta: "Felipe Torres, Larissa Moura · 2025",
  },
];

const events = [
  {
    day: "14",
    month: "OUT",
    title: "Biomarcadores no diagnóstico precoce do câncer",
    copy: "Prof. Dra. Ana Paula Souza · Departamento de Patologia Clínica",
    place: "Bloco C · Sala 12",
    time: "19h",
  },
  {
    day: "22",
    month: "OUT",
    title: "Hematologia clínica: casos práticos e interpretação laboratorial",
    copy: "Profissional convidado do Laboratório Sabin Goiânia",
    place: "Online · Google Meet",
    time: "20h",
  },
  {
    day: "28",
    month: "OUT",
    title: "Workshop: introdução às técnicas de PCR em tempo real",
    copy: "Atividade prática no laboratório de biologia molecular · 20 vagas",
    place: "Lab. BioMol",
    time: "08h–12h",
  },
];

const jobs = [
  {
    tag: "Estágio",
    tone: "green",
    title: "Estagiário em Análises Clínicas",
    company: "Laboratório Sabin · Goiânia",
    copy: "Rotina de hematologia e urinálise. 20h semanais com bolsa de R$ 800.",
    date: "Até 31 out",
  },
  {
    tag: "IC",
    tone: "teal",
    title: "Iniciação Científica · Microbiologia",
    company: "Unialfa · Prof. Dr. Carlos Menezes",
    copy: "Pesquisa sobre resistência antimicrobiana. Bolsa CNPq por 12 meses.",
    date: "Até 15 out",
  },
  {
    tag: "Monitoria",
    tone: "violet",
    title: "Monitor de Bioquímica Clínica",
    company: "Departamento de Biomedicina",
    copy: "Apoio aos alunos do 2º período nas aulas práticas de bioquímica.",
    date: "Até 10 out",
  },
  {
    tag: "Voluntário",
    tone: "orange",
    title: "Campanha de Saúde Comunitária",
    company: "UBS Vila Nova · Goiânia",
    copy: "Coleta e triagem em campanha de prevenção ao diabetes.",
    date: "Nov 2026",
  },
];

function Icon({
  name,
  size = 20,
}: {
  name: "arrow" | "calendar" | "clock" | "flask" | "briefcase" | "news" | "menu" | "users" | "book";
  size?: number;
}) {
  const paths = {
    arrow: <><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/></>,
    clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
    flask: <><path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-5-9V3"/><path d="M7.5 16h9"/></>,
    briefcase: <><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18M10 12v2h4v-2"/></>,
    news: <><rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 7h8M8 11h8M8 15h5"/></>,
    menu: <><path d="M4 7h16M4 12h16M4 17h16"/></>,
    users: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></>,
    book: <><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V4H6.5A2.5 2.5 0 0 0 4 6.5z"/><path d="M4 6.5v13"/></>,
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}

function Tag({ children, tone = "green" }: { children: React.ReactNode; tone?: string }) {
  return <span className={`tag tag-${tone}`}>{children}</span>;
}

function Filters({ items }: { items: string[] }) {
  const [active, setActive] = useState(items[0]);
  return (
    <div className="filters" aria-label="Filtros">
      {items.map((item) => (
        <button key={item} className={active === item ? "filter active" : "filter"} onClick={() => setActive(item)}>{item}</button>
      ))}
    </div>
  );
}

function PageHeader({ icon, eyebrow, title, copy }: { icon: "news" | "flask" | "calendar" | "briefcase"; eyebrow: string; title: string; copy: string }) {
  return (
    <section className="page-header">
      <div className="page-header-icon"><Icon name={icon} size={24} /></div>
      <div className={eyebrow === "Notícias" ? "relative z-10" : undefined}><span className={eyebrow === "Notícias" ? "eyebrow !text-sm !text-red-700" : "eyebrow"}>{eyebrow}</span><h1>{title}</h1><p>{copy}</p></div>
      <div className="page-code">PAGE / {eyebrow.toUpperCase()}</div>
    </section>
  );
}

function EventCard({ event }: { event: (typeof events)[number] }) {
  return (
    <article className="event-card">
      <div className="event-date"><strong>{event.day}</strong><span>{event.month}</span></div>
      <div className="event-content">
        <Tag>Próximo evento</Tag>
        <h3>{event.title}</h3>
        <p>{event.copy}</p>
        <div className="event-meta"><span><Icon name="calendar" size={15} />{event.place}</span><span><Icon name="clock" size={15} />{event.time}</span></div>
      </div>
      <button className="icon-button" aria-label={`Ver ${event.title}`}><Icon name="arrow" /></button>
    </article>
  );
}

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const page = pagesByPath[location.pathname] ?? "home";
  const [mobileOpen, setMobileOpen] = useState(false);

  const go = (target: Page) => {
    navigate(pagePaths[target]);
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="app-shell">
      <div className="build-strip">
        <div><span className="pulse" /> <strong>BioHub</strong><span>implementation map</span></div>
        <div className="build-meta"><span>6 pages</span><span>12 components</span><span className="ready">Ready for dev</span></div>
      </div>
      <header className="navbar overflow-visible">
        <div className="pointer-events-none absolute inset-0 bg-white" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 flex h-8 flex-col" aria-hidden="true">
          <span className="h-5 w-full bg-orange-400" />
          <span className="h-3 w-full bg-red-700" />
        </div>
        <button className="brand relative z-10" onClick={() => go("home")}><span className="brand-mark relative"><Icon name="flask" size={18} /><span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full border-2 border-white bg-red-700" /></span><span className="rounded-lg bg-white/95 px-2 py-1 text-2xl font-bold shadow-md ring-2 ring-white">Bio<strong>Hub</strong></span></button>
        <nav className={`${mobileOpen ? "nav-links open" : "nav-links"} relative z-10`}>
          {navItems.map((item) => <button key={item.id} onClick={() => go(item.id)} className={page === item.id ? "active" : ""}>{item.label}</button>)}
        </nav>
        <button className="member-button relative z-10 shadow-sm shadow-orange-900/10" onClick={() => go("login")}><span>Área da Liga</span><Icon name="arrow" size={16} /></button>
        <button className="menu-button relative z-10" aria-label="Abrir menu" onClick={() => setMobileOpen(!mobileOpen)}><span className="grid h-10 w-10 place-items-center rounded-full bg-white/95 text-emerald-900 shadow-md ring-2 ring-white"><Icon name="menu" size={22} /></span></button>
      </header>

      <main>
        {page === "home" && (
          <>
            <section className="hero">
              <div className="hero-copy">
                <div className="pointer-events-none absolute -left-20 top-1/3 h-40 w-40 rounded-full bg-orange-500/10 blur-3xl" />
                <div className="pointer-events-none absolute inset-y-0 left-0 w-screen overflow-hidden rounded-tl-3xl" aria-hidden="true">
                  <span className="absolute inset-y-0 left-0 w-full rounded-tl-3xl border-l-8 border-t-8 border-orange-400">
                    <span className="absolute -right-1 -top-2 h-2 w-4 rounded-full bg-orange-400" />
                  </span>
                  <span className="absolute bottom-0 left-2 right-0 top-2 rounded-tl-2xl border-l-4 border-t-4 border-red-700">
                    <span className="absolute -right-1 -top-1 h-1 w-3 rounded-full bg-red-700" />
                  </span>
                </div>
                <img
                  className="pointer-events-none absolute -bottom-8 right-0 w-72 opacity-[0.1] mix-blend-screen"
                  src={new URL("./imports/unialfa-logo-nome.png", import.meta.url).href}
                  alt=""
                  aria-hidden="true"
                />
                <div className="relative mb-7 flex items-center gap-3">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-white/15 bg-white p-1.5 shadow-xl">
                    <img
                      className="h-full w-full object-contain"
                      src={new URL("./imports/logo-unialfa.png", import.meta.url).href}
                      alt="Centro Universitário Alves Faria — UNIALFA"
                    />
                  </div>
                  <div className="flex min-w-0 flex-col gap-2">
                    <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-white/50">Uma iniciativa acadêmica</span>
                    <div className="flex items-center gap-1.5" aria-hidden="true">
                      <span className="h-1 w-10 rounded-full bg-emerald-400" />
                      <span className="h-1 w-4 rounded-full bg-orange-400" />
                      <span className="h-1 w-2 rounded-full bg-red-600" />
                    </div>
                  </div>
                </div>
                <span className="hero-kicker"><span /> Liga Acadêmica de Biotecnologia · Unialfa</span>
                <h1>Ciência que conecta.<br/><em>Conhecimento que transforma.</em></h1>
                <p>Artigos científicos, notícias, eventos e oportunidades para quem constrói o futuro da Biomedicina.</p>
                <div className="hero-actions"><button className="primary-button" onClick={() => go("artigos")}>Explorar artigos <Icon name="arrow" size={17}/></button><button className="secondary-button" onClick={() => go("agenda")}>Ver agenda</button></div>
                <div className="hero-note"><div className="avatars"><span>ML</span><span>JP</span><span>AF</span></div><p><strong>130+ estudantes</strong><br/>fazem parte desta comunidade</p></div>
              </div>
              <div className="hero-visual">
                <img src={photos.microscope} alt="Pesquisador observando amostra em microscópio" />
                <div className="photo-label"><span>01</span><div><strong>Pesquisa em foco</strong><small>Laboratório de Biomedicina</small></div></div>
                <div className="molecule molecule-one" /><div className="molecule molecule-two" />
              </div>
              <span className="section-label label-hero">SECTION / HERO</span>
            </section>

            <section className="stats-section">
              {[["24","Artigos publicados"],["08","Palestras realizadas"],["130+","Alunos participantes"],["12","Oportunidades abertas"]].map(([num,label], i) => <div className="stat" key={label}><span>0{i+1}</span><strong>{num}</strong><p>{label}</p></div>)}
            </section>

            <section className="content-section rounded-3xl border border-orange-100 bg-[#FFEDD4] px-6 py-8 shadow-sm shadow-orange-900/5 md:px-8">
              <div className="section-heading"><div><span className="eyebrow">Atualizações</span><h2>Últimas notícias</h2></div><button className="text-button" onClick={() => go("noticias")}>Ver todas <Icon name="arrow" size={16}/></button></div>
              <div className="news-grid rounded-2xl border border-orange-100 bg-gradient-to-br from-white via-orange-50/50 to-red-50/60 p-3">
                {news.map((item, index) => <article className="news-card cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2" key={item.title} role="link" tabIndex={0} onClick={() => go("noticias")} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") go("noticias"); }}><div className="news-image"><img src={item.image} alt="" /><span>0{index+1}</span></div><div className="news-content"><Tag tone={item.tone}>{item.tag}</Tag><h3>{item.title}</h3><p>{item.copy}</p><div className="card-footer"><span>{item.date} · {item.time} de leitura</span><Icon name="arrow" size={17}/></div></div></article>)}
              </div>
              <span className="section-label">SECTION / NEWS-GRID</span>
            </section>

            <section className="content-section agenda-preview isolate rounded-3xl border border-orange-100 bg-gradient-to-br from-white via-orange-50/40 to-red-50/40 px-6 py-8 md:px-8">
              <div className="pointer-events-none absolute left-8 top-0 flex h-1.5 w-28 overflow-hidden rounded-b-full" aria-hidden="true"><span className="h-full w-20 bg-orange-400" /><span className="h-full flex-1 bg-red-700" /></div>
              <div className="pointer-events-none absolute right-8 top-8 -z-10 flex items-center gap-2 opacity-70" aria-hidden="true"><span className="h-2 w-2 rounded-full bg-red-700" /><span className="h-3 w-3 rounded-full border-2 border-orange-400" /><span className="h-px w-10 bg-orange-300" /></div>
              <div className="section-heading relative z-10"><div><span className="eyebrow">Reserve a data</span><div className="mb-2 flex gap-1.5" aria-hidden="true"><span className="h-1 w-8 rounded-full bg-orange-400" /><span className="h-1 w-3 rounded-full bg-red-700" /></div><h2>Próximos encontros</h2></div><button className="text-button" onClick={() => go("agenda")}>Agenda completa <Icon name="arrow" size={16}/></button></div>
              <div className="events-list relative z-10">{events.slice(0,2).map((event) => <EventCard key={event.title} event={event}/>)}</div>
              <span className="section-label">SECTION / EVENTS</span>
            </section>
          </>
        )}

        {page === "noticias" && <div className="page-wrap"><PageHeader icon="news" eyebrow="Notícias" title="O que acontece no BioHub UNIALFA" copy="Avisos da liga, representação de turma e informações que movimentam o curso."/><Filters items={["Todos","Liga Acadêmica","Congresso","Representação","Avisos"]}/><div className="news-grid">{[...news, {...news[0], title:"Mudança no calendário de reuniões mensais", tag:"Avisos", tone:"orange", image:photos.campus}].map((item,index)=><article className="news-card" key={item.title}><div className="news-image"><img src={item.image} alt="" /><span>0{index+1}</span></div><div className="news-content"><Tag tone={item.tone}>{item.tag}</Tag><h3>{item.title}</h3><p>{item.copy}</p><div className="card-footer"><span>{item.date} · {item.time}</span><Icon name="arrow" size={17}/></div></div></article>)}</div></div>}

        {page === "artigos" && <div className="page-wrap"><PageHeader icon="flask" eyebrow="Artigos" title="Conhecimento em movimento" copy="Produções acadêmicas dos alunos e membros da Liga de Biotecnologia."/><Filters items={["Todos","Hematologia","Microbiologia","Genética","Bioquímica","Imunologia"]}/><div className="articles-list">{articles.map((item,index)=><article className="article-row" key={item.title}><div className="article-index">0{index+1}</div><div className="article-main"><Tag tone={item.tone}>{item.area}</Tag><h2>{item.title}</h2><p>{item.copy}</p><span>{item.meta}</span></div><button className="round-action" aria-label="Abrir artigo"><Icon name="arrow"/></button></article>)}</div></div>}

        {page === "agenda" && <div className="page-wrap"><PageHeader icon="calendar" eyebrow="Agenda" title="Encontros que inspiram" copy="Palestras, workshops e eventos do curso e da liga acadêmica."/><Filters items={["Todos","Palestras","Workshops","Visitas técnicas","Congressos"]}/><div className="month-title"><span>10</span><div><small>2026</small><h2>Outubro</h2></div></div><div className="events-list">{events.map((event)=><EventCard key={event.title} event={event}/>)}</div><div className="month-title compact"><span>11</span><div><small>2026</small><h2>Novembro</h2></div></div><EventCard event={{day:"08",month:"NOV",title:"III Congresso de Biomedicina da Unialfa",copy:"Apresentação de trabalhos científicos, palestras e mesa-redonda",place:"Auditório principal",time:"08h–18h"}}/></div>}

        {page === "estagios" && <div className="page-wrap"><PageHeader icon="briefcase" eyebrow="Oportunidades" title="Seu próximo passo começa aqui" copy="Vagas de estágio, monitoria e iniciação científica selecionadas para você."/><Filters items={["Todos","Estágio","Monitoria","Iniciação científica","Voluntário"]}/><div className="jobs-grid">{jobs.map((job,index)=><article className="job-card" key={job.title}><div className="job-top"><span className="job-number">0{index+1}</span><Tag tone={job.tone}>{job.tag}</Tag></div><h2>{job.title}</h2><strong>{job.company}</strong><p>{job.copy}</p><div className="job-footer"><span><Icon name="clock" size={15}/>{job.date}</span><button>Ver oportunidade <Icon name="arrow" size={16}/></button></div></article>)}</div></div>}

        {page === "login" && <div className="login-page"><div className="login-aside"><span className="hero-kicker"><span/> Área restrita</span><h1>Bem-vindo de volta à comunidade BioHub.</h1><p>Gerencie publicações, eventos e oportunidades em um só lugar.</p><div className="login-feature"><Icon name="users"/><div><strong>Espaço colaborativo</strong><span>Feito para a diretoria da liga</span></div></div></div><section className="login-card"><div className="login-brand"><span className="brand-mark"><Icon name="flask" size={18}/></span><span>Bio<strong>Hub</strong></span></div><span className="eyebrow">Acesso de membro</span><h2>Entre na sua conta</h2><p>Use os dados fornecidos pela diretoria.</p><label>Matrícula<input type="text" placeholder="Ex: 2024001234"/></label><label>Senha<input type="password" placeholder="Sua senha"/></label><button className="login-submit">Entrar na plataforma <Icon name="arrow" size={17}/></button><small>Problemas para acessar? <button>Fale com a diretoria</button></small></section></div>}
      </main>
      <footer><div className="footer-brand">Bio<strong>Hub</strong></div><div className="flex flex-col gap-1.5"><p>Liga Acadêmica de Biotecnologia · Unialfa</p><p className="text-white/60">Contato com a liga · email-exemplo</p><p className="flex items-center gap-1.5 text-white/60"><svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>@liga-biohub-unialfa</p></div><span>Site desenvolvido por alunos · 2026</span></footer>
    </div>
  );
}
