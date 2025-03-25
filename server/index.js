import { jsx, jsxs } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { ServerRouter, useMatches, useActionData, useLoaderData, useParams, useRouteError, Meta, Links, ScrollRestoration, Scripts, Outlet, isRouteErrorResponse } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { createElement, useState, useRef } from "react";
import * as htmlToImage from "html-to-image";
import * as jsPDF from "jspdf";
import { Mail, Phone, Download, Linkedin, Github, User, Wrench, Briefcase, Code } from "lucide-react";
const streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    let userAgent = request.headers.get("user-agent");
    let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(ServerRouter, { context: routerContext, url: request.url }),
      {
        [readyOption]() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, streamTimeout + 1e3);
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest,
  streamTimeout
}, Symbol.toStringTag, { value: "Module" }));
function withComponentProps(Component) {
  return function Wrapped() {
    const props = {
      params: useParams(),
      loaderData: useLoaderData(),
      actionData: useActionData(),
      matches: useMatches()
    };
    return createElement(Component, props);
  };
}
function withErrorBoundaryProps(ErrorBoundary3) {
  return function Wrapped() {
    const props = {
      params: useParams(),
      loaderData: useLoaderData(),
      actionData: useActionData(),
      error: useRouteError()
    };
    return createElement(ErrorBoundary3, props);
  };
}
const ProfessionalCVV2 = () => {
  const [activeSection, setActiveSection] = useState("summary");
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const cvRef = useRef(null);
  const skills = [
    {
      id: "dev-stack",
      category: "Software Development",
      skills: ["Python", "TypeScript", "Java", "JavaScript"],
      proficiency: 90
    },
    {
      id: "frontend",
      category: "Frontend Technologies",
      skills: ["React", "Angular", "Next.js", "Tailwind CSS"],
      proficiency: 85
    },
    {
      id: "backend",
      category: "Backend Technologies",
      skills: ["Node.js", "Spring", ".NET", "Flask", "FastAPI"],
      proficiency: 80
    }
  ];
  const experiences = [
    {
      id: "soitec",
      company: "Soitec",
      position: "Data Engineer",
      startDate: "Sep 2023",
      endDate: "Present",
      location: "Grenoble, France",
      achievements: [
        "Developed ETL pipelines using Talend for multi-source data integration",
        "Created Python Flask API for advanced monitoring systems",
        "Designed interactive Tableau dashboards for critical KPIs"
      ],
      technologies: ["Python", "Talend", "Flask", "Tableau"]
    }
  ];
  const projects = [
    {
      id: "data-pipeline",
      name: "Enterprise Data Integration Platform",
      description: "Scalable ETL solution for comprehensive data management",
      technologies: ["Python", "Apache Airflow", "PostgreSQL"],
      githubLink: "https://github.com/matiasfreund/data-pipeline"
    }
  ];
  const exportCV = async (format) => {
    if (!cvRef.current) return;
    try {
      const dataUrl = await htmlToImage.toPng(cvRef.current);
      if (format === "pdf") {
        const pdf = new jsPDF.jsPDF();
        pdf.addImage(dataUrl, "PNG", 10, 10, 190, 277);
        pdf.save("matias-freund-cv.pdf");
      }
    } catch (error) {
      console.error("Export failed", error);
    }
  };
  const navItems = [
    { section: "summary", icon: /* @__PURE__ */ jsx(User, { className: "mr-2" }), label: "Profile" },
    { section: "skills", icon: /* @__PURE__ */ jsx(Wrench, { className: "mr-2" }), label: "Skills" },
    { section: "experience", icon: /* @__PURE__ */ jsx(Briefcase, { className: "mr-2" }), label: "Experience" },
    { section: "projects", icon: /* @__PURE__ */ jsx(Code, { className: "mr-2" }), label: "Projects" }
  ];
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-gray-50 flex items-center justify-center p-4", children: [
    /* @__PURE__ */ jsxs("div", { ref: cvRef, className: "w-full max-w-4xl bg-white shadow-2xl rounded-2xl overflow-hidden grid grid-cols-3 min-h-[800px]", children: [
      /* @__PURE__ */ jsxs("div", { className: "col-span-1 bg-gradient-to-b from-blue-600 to-purple-700 text-white p-6 flex flex-col", children: [
        /* @__PURE__ */ jsxs("div", { className: "text-center mb-8", children: [
          /* @__PURE__ */ jsx("div", { className: "w-32 h-32 mx-auto mb-4 bg-white rounded-full overflow-hidden border-4 border-white shadow-lg", children: /* @__PURE__ */ jsx("img", { src: "/api/placeholder/150/150", alt: "Matias Freund", className: "w-full h-full object-cover" }) }),
          /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold", children: "Matias Freund" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm opacity-80", children: "Software Developer" })
        ] }),
        /* @__PURE__ */ jsx("nav", { className: "space-y-4", children: navItems.map(({ section, icon, label }) => /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setActiveSection(section),
            className: `w-full text-left p-2 rounded-lg transition-all duration-300 ${activeSection === section ? "bg-white/20 text-white" : "hover:bg-white/10 text-white/70"}`,
            children: /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
              icon,
              label
            ] })
          },
          section
        )) }),
        /* @__PURE__ */ jsxs("div", { className: "mt-auto space-y-4", children: [
          /* @__PURE__ */ jsxs("a", { href: "mailto:matiasfreund@gmail.com", className: "flex items-center text-white/80 hover:text-white", children: [
            /* @__PURE__ */ jsx(Mail, { className: "mr-2", size: 18 }),
            "matiasfreund@gmail.com"
          ] }),
          /* @__PURE__ */ jsxs("a", { href: "tel:+33688865744", className: "flex items-center text-white/80 hover:text-white", children: [
            /* @__PURE__ */ jsx(Phone, { className: "mr-2", size: 18 }),
            "+33 06 88 86 57 44"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "col-span-2 p-8", children: [
        activeSection === "summary" && /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold mb-4 text-blue-700", children: "Professional Summary" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-700 leading-relaxed", children: "Innovative software developer with a strong background in full-stack development, data engineering, and cloud infrastructure. Passionate about creating efficient, scalable solutions that drive business value. Experienced in Python, TypeScript, and modern web technologies with a proven track record of delivering robust technical solutions." })
        ] }),
        activeSection === "skills" && /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold mb-6 text-blue-700", children: "Technical Skills" }),
          skills.map((skillCategory) => /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
            /* @__PURE__ */ jsx("h3", { className: "font-semibold text-gray-700 mb-3", children: skillCategory.category }),
            /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: skillCategory.skills.map((skill) => /* @__PURE__ */ jsx("span", { className: "bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm", children: skill }, skill)) })
          ] }, skillCategory.id))
        ] }),
        activeSection === "experience" && /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold mb-6 text-blue-700", children: "Experience" }),
          experiences.map((exp) => /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
            /* @__PURE__ */ jsxs("h3", { className: "font-semibold text-gray-700", children: [
              exp.position,
              " at ",
              exp.company
            ] }),
            /* @__PURE__ */ jsxs("p", { className: "text-gray-600", children: [
              exp.startDate,
              " - ",
              exp.endDate,
              " | ",
              exp.location
            ] }),
            /* @__PURE__ */ jsx("ul", { className: "list-disc list-inside text-gray-700 mt-2", children: exp.achievements.map((ach, idx) => /* @__PURE__ */ jsx("li", { children: ach }, idx)) })
          ] }, exp.id))
        ] }),
        activeSection === "projects" && /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold mb-6 text-blue-700", children: "Projects" }),
          projects.map((proj) => /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
            /* @__PURE__ */ jsx("h3", { className: "font-semibold text-gray-700", children: proj.name }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: proj.description }),
            /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2 mt-2", children: proj.technologies.map((tech) => /* @__PURE__ */ jsx("span", { className: "bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm", children: tech }, tech)) }),
            proj.githubLink && /* @__PURE__ */ jsx(
              "a",
              {
                href: proj.githubLink,
                target: "_blank",
                rel: "noopener noreferrer",
                className: "text-blue-600 mt-2 inline-block",
                children: "View on GitHub"
              }
            )
          ] }, proj.id))
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "fixed bottom-6 right-6 space-x-4", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => exportCV("pdf"),
          className: "bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition",
          title: "Download PDF",
          children: /* @__PURE__ */ jsx(Download, {})
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => window.open("https://linkedin.com/in/matias-freund", "_blank"),
          className: "bg-blue-700 text-white p-3 rounded-full shadow-lg hover:bg-blue-800 transition",
          title: "LinkedIn Profile",
          children: /* @__PURE__ */ jsx(Linkedin, {})
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => window.open("https://github.com/matiasfreund", "_blank"),
          className: "bg-gray-800 text-white p-3 rounded-full shadow-lg hover:bg-black transition",
          title: "GitHub Profile",
          children: /* @__PURE__ */ jsx(Github, {})
        }
      )
    ] })
  ] });
};
const links = () => [{
  rel: "preconnect",
  href: "https://fonts.googleapis.com"
}, {
  rel: "preconnect",
  href: "https://fonts.gstatic.com",
  crossOrigin: "anonymous"
}, {
  rel: "stylesheet",
  href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
}];
function Layout({
  children
}) {
  return /* @__PURE__ */ jsxs("html", {
    lang: "en",
    children: [/* @__PURE__ */ jsxs("head", {
      children: [/* @__PURE__ */ jsx("meta", {
        charSet: "utf-8"
      }), /* @__PURE__ */ jsx("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      }), /* @__PURE__ */ jsx(Meta, {}), /* @__PURE__ */ jsx(Links, {})]
    }), /* @__PURE__ */ jsxs("body", {
      children: [children, /* @__PURE__ */ jsx(ScrollRestoration, {}), /* @__PURE__ */ jsx(Scripts, {})]
    })]
  });
}
const root = withComponentProps(function App() {
  return /* @__PURE__ */ jsx(Outlet, {});
});
const ErrorBoundary = withErrorBoundaryProps(function ErrorBoundary2({
  error
}) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack;
  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  }
  return /* @__PURE__ */ jsxs("main", {
    className: "pt-16 p-4 container mx-auto",
    children: [/* @__PURE__ */ jsx("h1", {
      children: message
    }), /* @__PURE__ */ jsx("p", {
      children: details
    }), stack]
  });
});
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary,
  Layout,
  default: root,
  links
}, Symbol.toStringTag, { value: "Module" }));
function meta({}) {
  return [{
    title: "New React Router App"
  }, {
    name: "description",
    content: "Welcome to React Router!"
  }];
}
const home = withComponentProps(function Home() {
  return /* @__PURE__ */ jsx(ProfessionalCVV2, {});
});
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: home,
  meta
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-Ks5PdKEw.js", "imports": ["/assets/chunk-GNGMS2XR-Dos2DHKy.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": true, "module": "/assets/root-DIbioEad.js", "imports": ["/assets/chunk-GNGMS2XR-Dos2DHKy.js", "/assets/jspdf.es.min-_UUNRCS9.js"], "css": ["/assets/root-fuf5R-1l.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "hydrateFallbackModule": void 0 }, "routes/home": { "id": "routes/home", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/home-DKb3D7-Y.js", "imports": ["/assets/jspdf.es.min-_UUNRCS9.js", "/assets/chunk-GNGMS2XR-Dos2DHKy.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "hydrateFallbackModule": void 0 } }, "url": "/assets/manifest-169c6d65.js", "version": "169c6d65" };
const assetsBuildDirectory = "build\\client";
const basename = "/";
const future = { "unstable_middleware": false, "unstable_optimizeDeps": false, "unstable_splitRouteModules": false, "unstable_viteEnvironmentApi": false };
const ssr = true;
const isSpaMode = false;
const prerender = [];
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/home": {
    id: "routes/home",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route1
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  prerender,
  publicPath,
  routes,
  ssr
};
