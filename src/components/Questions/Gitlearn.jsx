import React, { useEffect, useMemo, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, Code2, ArrowRight, Copy, Check, Info, AlertCircle, CheckCircle2, Terminal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function GitGithubLearn() {
  const navigate = useNavigate();
  const [copiedId, setCopiedId] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const sections = useMemo(() => [
    { id: "intro", title: "What is Git & GitHub?" },
    { id: "install", title: "Install Git" },
    { id: "config", title: "Configure Git" },
    { id: "init", title: "Initialize Repository" },
    { id: "workflow", title: "Git Workflow" },
    { id: "addcommit", title: "Add & Commit" },
    { id: "statuslog", title: "Status & Log" },
    { id: "gitignore", title: "Ignoring Files" },
    { id: "branch", title: "Branches" },
    { id: "merge", title: "Merging" },
    { id: "conflicts", title: "Resolving Conflicts" },
    { id: "github", title: "Connect to GitHub" },
    { id: "pushpull", title: "Push & Pull" },
    { id: "clone", title: "Cloning Repositories" },
    { id: "fork", title: "Forking & Contributing" },
    { id: "pr", title: "Pull Requests" },
    { id: "issues", title: "GitHub Issues" },
    { id: "advanced", title: "Advanced Commands" },
    { id: "best", title: "Best Practices" },
  ], []);

  const [activeId, setActiveId] = useState("intro");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) setActiveId(visible.target.id);
      },
      { threshold: [0.2, 0.4, 0.6], rootMargin: "-120px 0px -60% 0px" }
    );

    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections]);

  const scrollTo = useCallback((id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const copyToClipboard = useCallback((text, id) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  }, []);

  const CodeBlock = ({ children, id, language = "bash" }) => {
    const blockId = `code-${id}`;
    const isCopied = copiedId === blockId;

    return (
      <div className="rounded-2xl border border-slate-200 overflow-hidden shadow-sm mb-4 w-full">
        <div className="flex justify-between px-4 py-2 bg-slate-50 border-b border-slate-200">
          <span className="text-xs font-semibold text-slate-600 flex items-center gap-2">
            <Terminal className="w-3.5 h-3.5" />
            {language}
          </span>
          <button onClick={() => copyToClipboard(children, blockId)} className="text-xs flex items-center gap-1">
            {isCopied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
            {isCopied ? "Copied" : "Copy"}
          </button>
        </div>
        <pre className="bg-slate-900 text-slate-50 p-4 text-sm overflow-x-auto rounded-b-2xl">
          <code>{children}</code>
        </pre>
      </div>
    );
  };

  const InfoBox = ({ children, type = "info" }) => {
    const styles = {
      info: "bg-blue-50 border-blue-200 text-blue-800",
      tip: "bg-green-50 border-green-200 text-green-800",
      warning: "bg-amber-50 border-amber-200 text-amber-800",
    };
    const icons = {
      info: <Info className="w-5 h-5" />,
      tip: <CheckCircle2 className="w-5 h-5" />,
      warning: <AlertCircle className="w-5 h-5" />,
    };
    return (
      <div className={`border rounded-xl p-4 mb-4 ${styles[type]}`}>
        <div className="flex gap-3">
          <div className="mt-0.5">{icons[type]}</div>
          <div className="text-sm leading-relaxed">{children}</div>
        </div>
      </div>
    );
  };

  const Section = ({ id, title, children }) => (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm scroll-mt-28"
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-gray-800 to-gray-600 text-white flex items-center justify-center">
          <Code2 className="w-5 h-5" />
        </div>
        <h2 className="text-2xl font-bold">{title}</h2>
      </div>
      {children}
    </motion.section>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-slate-100">
      <AnimatePresence>
        {copiedId && (
          <motion.div className="fixed top-4 right-4 bg-green-600 text-white px-4 py-2 rounded-xl shadow-lg z-50">
            Command copied!
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-10 bg-gradient-to-r from-gray-50 to-slate-100 p-8 rounded-3xl border">
          <h1 className="text-4xl font-extrabold mb-4">Git & GitHub Comprehensive Tutorial</h1>
          <p className="text-lg text-slate-700 max-w-2xl">
            Master version control and collaboration with Git and GitHub.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <button onClick={() => navigate("/gitgithub")} className="px-6 py-3 bg-gray-800 text-white rounded-xl font-semibold flex items-center gap-2">
              Start Git Quiz <ArrowRight className="w-4 h-4" />
            </button>
            <button onClick={() => scrollTo("init")} className="px-6 py-3 border border-gray-400 rounded-xl font-semibold">
              Jump to First Repo
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[260px_minmax(0,1fr)] gap-10">
          {/* Sidebar */}
          <aside className="hidden lg:block lg:sticky lg:top-24 self-start">
            <div className="bg-white border rounded-2xl p-4 shadow-sm w-[260px]">
              <h3 className="flex items-center gap-2 font-bold mb-3">
                <BookOpen className="w-5 h-5 text-gray-700" /> Contents
              </h3>
              <div className="space-y-1 max-h-[70vh] overflow-y-auto pr-1">
                {sections.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => scrollTo(s.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm ${
                      activeId === s.id ? "bg-gray-800 text-white" : "hover:bg-gray-100 text-gray-700"
                    }`}
                  >
                    {s.title}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Main Content */}
           <main className="space-y-6">
            <Section id="intro" title="What is Git & GitHub?">
              <div className="space-y-4 text-slate-700">
                <p>
                  <strong className="text-gray-900">Git</strong> is a distributed version control system that tracks changes in your code over time. 
                  It allows you to save snapshots of your project, revert to previous states, and collaborate with others efficiently.
                </p>
                <p>
                  <strong className="text-gray-900">GitHub</strong> is a cloud-based platform that hosts Git repositories. 
                  It adds collaboration features like pull requests, issues, project management tools, and more.
                </p>
                <div className="bg-slate-50 rounded-xl p-4 mt-4">
                  <h4 className="font-semibold mb-2 text-gray-900">Key Benefits:</h4>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Track every change to your codebase</li>
                    <li>Collaborate with team members seamlessly</li>
                    <li>Experiment with new features without breaking existing code</li>
                    <li>Maintain a complete history of your project</li>
                    <li>Backup and share your code in the cloud</li>
                  </ul>
                </div>
              </div>
            </Section>

            <Section id="install" title="Install Git">
              <div className="space-y-4">
                <p className="text-slate-700">
                  Before using Git, you need to install it on your system. The installation process varies by operating system.
                </p>
                
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900">Windows:</h4>
                  <p className="text-sm text-slate-600">Download from <a href="https://git-scm.com" className="text-blue-600 underline">git-scm.com</a> and run the installer.</p>
                  
                  <h4 className="font-semibold text-gray-900 mt-4">macOS:</h4>
                  <CodeBlock id="install-mac">brew install git</CodeBlock>
                  
                  <h4 className="font-semibold text-gray-900 mt-4">Linux (Ubuntu/Debian):</h4>
                  <CodeBlock id="install-linux">sudo apt-get update
sudo apt-get install git</CodeBlock>
                </div>

                <InfoBox type="tip">
                  Verify your installation by checking the Git version:
                </InfoBox>
                <CodeBlock id="install-verify">git --version</CodeBlock>
              </div>
            </Section>

            <Section id="config" title="Configure Git">
              <div className="space-y-4">
                <p className="text-slate-700">
                  After installing Git, configure your identity. This information will be associated with every commit you make.
                </p>

                <h4 className="font-semibold text-gray-900">Set your name and email:</h4>
                <CodeBlock id="config-name">git config --global user.name "Your Name"</CodeBlock>
                <CodeBlock id="config-email">git config --global user.email "your.email@example.com"</CodeBlock>

                <InfoBox type="info">
                  The <code className="bg-slate-200 px-1.5 py-0.5 rounded">--global</code> flag sets these configurations for all repositories on your system. 
                  Omit it to set configurations for a specific repository only.
                </InfoBox>

                <h4 className="font-semibold text-gray-900 mt-4">Other useful configurations:</h4>
                <CodeBlock id="config-editor"># Set default text editor
git config --global core.editor "code --wait"

# Enable colored output
git config --global color.ui auto

# Set default branch name to 'main'
git config --global init.defaultBranch main</CodeBlock>

                <h4 className="font-semibold text-gray-900 mt-4">View your configurations:</h4>
                <CodeBlock id="config-list">git config --list</CodeBlock>
              </div>
            </Section>

            <Section id="init" title="Initialize Repository">
              <div className="space-y-4">
                <p className="text-slate-700">
                  Initializing a repository creates a new Git repository in your project folder. This tells Git to start tracking changes in that directory.
                </p>

                <h4 className="font-semibold text-gray-900">Step 1: Navigate to your project folder</h4>
                <CodeBlock id="init-cd">cd /path/to/your/project</CodeBlock>

                <h4 className="font-semibold text-gray-900">Step 2: Initialize the repository</h4>
                <CodeBlock id="init-1">git init</CodeBlock>

                <InfoBox type="tip">
                  This creates a hidden <code className="bg-green-100 px-1.5 py-0.5 rounded">.git</code> folder in your project directory. 
                  This folder contains all the version control information. Never delete it unless you want to remove Git tracking!
                </InfoBox>

                <h4 className="font-semibold text-gray-900 mt-4">Alternative: Initialize with a specific branch name</h4>
                <CodeBlock id="init-branch">git init -b main</CodeBlock>

                <h4 className="font-semibold text-gray-900 mt-4">Initialize and create a new project folder</h4>
                <CodeBlock id="init-new">git init my-new-project
cd my-new-project</CodeBlock>

                <div className="bg-slate-50 rounded-xl p-4 mt-4">
                  <h4 className="font-semibold mb-2 text-gray-900">What happens when you run git init?</h4>
                  <ul className="list-disc pl-6 space-y-1 text-sm text-slate-700">
                    <li>Creates a <code className="bg-slate-200 px-1 py-0.5 rounded text-xs">.git</code> subdirectory</li>
                    <li>Sets up the repository structure (objects, refs, HEAD)</li>
                    <li>Configures the default branch (usually 'main' or 'master')</li>
                    <li>The directory becomes a Git repository ready to track changes</li>
                  </ul>
                </div>

                <InfoBox type="warning">
                  Don't initialize a Git repository inside another Git repository (nested repos) unless you're working with submodules, which is an advanced topic.
                </InfoBox>
              </div>
            </Section>

            <Section id="workflow" title="Git Workflow">
              <div className="space-y-4">
                <p className="text-slate-700">
                  Understanding the Git workflow is crucial. Git has three main states for your files:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                    <h4 className="font-semibold text-red-800 mb-2">Working Directory</h4>
                    <p className="text-sm text-red-700">Files you're currently editing. Changes are not tracked yet.</p>
                  </div>
                  <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                    <h4 className="font-semibold text-yellow-800 mb-2">Staging Area</h4>
                    <p className="text-sm text-yellow-700">Changes marked to be included in the next commit.</p>
                  </div>
                  <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                    <h4 className="font-semibold text-green-800 mb-2">Repository</h4>
                    <p className="text-sm text-green-700">Committed changes saved permanently in Git history.</p>
                  </div>
                </div>

                <div className="bg-slate-900 text-slate-50 rounded-xl p-6 font-mono text-sm">
                  <div className="text-center space-y-2">
                    <div>Working Directory (Modified files)</div>
                    <div className="text-slate-400">↓ git add</div>
                    <div>Staging Area (Staged files)</div>
                    <div className="text-slate-400">↓ git commit</div>
                    <div>Repository (Committed files)</div>
                    <div className="text-slate-400">↓ git push</div>
                    <div>Remote Repository (GitHub)</div>
                  </div>
                </div>
              </div>
            </Section>

            <Section id="addcommit" title="Add & Commit">
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900">Adding files to staging area:</h4>
                
                <CodeBlock id="add-all">git add .</CodeBlock>
                <p className="text-sm text-slate-600">Stages all changes in the current directory</p>

                <CodeBlock id="add-specific">git add filename.txt</CodeBlock>
                <p className="text-sm text-slate-600">Stages a specific file</p>

                <CodeBlock id="add-multiple">git add file1.txt file2.js file3.css</CodeBlock>
                <p className="text-sm text-slate-600">Stages multiple specific files</p>

                <CodeBlock id="add-pattern">git add *.js</CodeBlock>
                <p className="text-sm text-slate-600">Stages all JavaScript files</p>

                <h4 className="font-semibold text-gray-900 mt-6">Committing changes:</h4>
                
                <CodeBlock id="commit-1">git commit -m "Initial commit"</CodeBlock>
                <p className="text-sm text-slate-600">Commits staged changes with a message</p>

                <CodeBlock id="commit-detailed">git commit -m "Add user authentication" -m "Implemented login and signup functionality with JWT tokens"</CodeBlock>
                <p className="text-sm text-slate-600">Commit with title and description</p>

                <CodeBlock id="commit-all">git commit -am "Update README"</CodeBlock>
                <p className="text-sm text-slate-600">Add and commit all tracked files in one command</p>

                <InfoBox type="tip">
                  <strong>Write meaningful commit messages!</strong> Good format: "Verb + what you did" 
                  <br />Examples: "Add login feature", "Fix navigation bug", "Update documentation"
                </InfoBox>
              </div>
            </Section>

            <Section id="statuslog" title="Status & Log">
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900">Check repository status:</h4>
                <CodeBlock id="status-1">git status</CodeBlock>
                <p className="text-sm text-slate-600">Shows which files are modified, staged, or untracked</p>

                <CodeBlock id="status-short">git status -s</CodeBlock>
                <p className="text-sm text-slate-600">Short, compact status output</p>

                <h4 className="font-semibold text-gray-900 mt-6">View commit history:</h4>
                <CodeBlock id="log-1">git log</CodeBlock>
                <p className="text-sm text-slate-600">Shows full commit history</p>

                <CodeBlock id="log-oneline">git log --oneline</CodeBlock>
                <p className="text-sm text-slate-600">Compact one-line-per-commit view</p>

                <CodeBlock id="log-graph">git log --graph --oneline --all</CodeBlock>
                <p className="text-sm text-slate-600">Visual graph of branches and commits</p>

                <CodeBlock id="log-author">git log --author="John Doe"</CodeBlock>
                <p className="text-sm text-slate-600">Show commits by specific author</p>

                <CodeBlock id="log-since">git log --since="2 weeks ago"</CodeBlock>
                <p className="text-sm text-slate-600">Show commits from a specific time period</p>
              </div>
            </Section>

            <Section id="gitignore" title="Ignoring Files">
              <div className="space-y-4">
                <p className="text-slate-700">
                  The <code className="bg-slate-200 px-1.5 py-0.5 rounded">.gitignore</code> file tells Git which files or folders to ignore in a project.
                </p>

                <h4 className="font-semibold text-gray-900">Create a .gitignore file:</h4>
                <CodeBlock id="gitignore-create" language="text"># .gitignore file

# Dependencies
node_modules/
vendor/

# Environment variables
.env
.env.local

# Build outputs
dist/
build/
*.log

# OS files
.DS_Store
Thumbs.db

# IDE files
.vscode/
.idea/
*.swp</CodeBlock>

                <InfoBox type="info">
                  Common practice: Add <code className="bg-blue-100 px-1.5 py-0.5 rounded">.gitignore</code> at the start of your project. 
                  Templates available at <a href="https://gitignore.io" className="text-blue-600 underline">gitignore.io</a>
                </InfoBox>
              </div>
            </Section>

            <Section id="branch" title="Branches">
              <div className="space-y-4">
                <p className="text-slate-700">
                  Branches allow you to develop features, fix bugs, or experiment without affecting the main codebase.
                </p>

                <h4 className="font-semibold text-gray-900">List all branches:</h4>
                <CodeBlock id="branch-list">git branch</CodeBlock>

                <h4 className="font-semibold text-gray-900">Create a new branch:</h4>
                <CodeBlock id="branch-1">git branch feature-login</CodeBlock>

                <h4 className="font-semibold text-gray-900">Switch to a branch:</h4>
                <CodeBlock id="branch-2">git checkout feature-login</CodeBlock>

                <h4 className="font-semibold text-gray-900">Create and switch in one command:</h4>
                <CodeBlock id="branch-checkout">git checkout -b feature-login</CodeBlock>

                <h4 className="font-semibold text-gray-900">Modern alternative (Git 2.23+):</h4>
                <CodeBlock id="branch-switch">git switch feature-login
# or create and switch:
git switch -c feature-login</CodeBlock>

                <h4 className="font-semibold text-gray-900">Delete a branch:</h4>
                <CodeBlock id="branch-delete">git branch -d feature-login</CodeBlock>

                <h4 className="font-semibold text-gray-900">Rename current branch:</h4>
                <CodeBlock id="branch-rename">git branch -m new-branch-name</CodeBlock>

                <InfoBox type="tip">
                  Common branch naming conventions: <code className="bg-green-100 px-1.5 py-0.5 rounded">feature/</code>, 
                  <code className="bg-green-100 px-1.5 py-0.5 rounded ml-1">bugfix/</code>, 
                  <code className="bg-green-100 px-1.5 py-0.5 rounded ml-1">hotfix/</code>
                </InfoBox>
              </div>
            </Section>

            <Section id="merge" title="Merging">
              <div className="space-y-4">
                <p className="text-slate-700">
                  Merging combines changes from one branch into another, typically merging a feature branch into main.
                </p>

                <h4 className="font-semibold text-gray-900">Basic merge workflow:</h4>
                <CodeBlock id="merge-1">git checkout main
git merge feature-login</CodeBlock>

                <h4 className="font-semibold text-gray-900">Merge with commit message:</h4>
                <CodeBlock id="merge-message">git merge feature-login -m "Merge feature-login into main"</CodeBlock>

                <h4 className="font-semibold text-gray-900">Abort a merge:</h4>
                <CodeBlock id="merge-abort">git merge --abort</CodeBlock>

                <div className="bg-slate-50 rounded-xl p-4">
                  <h4 className="font-semibold mb-2 text-gray-900">Merge Strategies:</h4>
                  <ul className="list-disc pl-6 space-y-1 text-sm text-slate-700">
                    <li><strong>Fast-forward:</strong> No divergent changes, simply moves pointer forward</li>
                    <li><strong>Recursive:</strong> Default strategy for merging two branches</li>
                    <li><strong>Squash:</strong> Combines all commits into one</li>
                  </ul>
                </div>
              </div>
            </Section>

            <Section id="conflicts" title="Resolving Conflicts">
              <div className="space-y-4">
                <p className="text-slate-700">
                  Conflicts occur when Git can't automatically merge changes. You must resolve them manually.
                </p>

                <InfoBox type="warning">
                  When a conflict occurs, Git marks the conflicting areas in your files with special markers:
                </InfoBox>

                <CodeBlock id="conflict-example" language="text">{'<<<<<<< HEAD\nYour current changes\n=======\nIncoming changes from the other branch\n>>>>>>> feature-branch'}</CodeBlock>

                <h4 className="font-semibold text-gray-900">Steps to resolve:</h4>
                <div className="bg-slate-50 rounded-xl p-4">
                  <ol className="list-decimal pl-6 space-y-2 text-sm text-slate-700">
                    <li>Open the conflicted file(s)</li>
                    <li>Locate the conflict markers (<code className="bg-slate-200 px-1 py-0.5 rounded text-xs">&lt;&lt;&lt;&lt;&lt;&lt;&lt;</code>, <code className="bg-slate-200 px-1 py-0.5 rounded text-xs">=======</code>, <code className="bg-slate-200 px-1 py-0.5 rounded text-xs">&gt;&gt;&gt;&gt;&gt;&gt;&gt;</code>)</li>
                    <li>Edit the file to keep the desired changes</li>
                    <li>Remove the conflict markers</li>
                    <li>Stage the resolved file: <code className="bg-slate-200 px-1 py-0.5 rounded text-xs">git add filename</code></li>
                    <li>Complete the merge: <code className="bg-slate-200 px-1 py-0.5 rounded text-xs">git commit</code></li>
                  </ol>
                </div>

                <h4 className="font-semibold text-gray-900 mt-4">View conflicts:</h4>
                <CodeBlock id="conflict-status">git status</CodeBlock>

                <h4 className="font-semibold text-gray-900">Use merge tools:</h4>
                <CodeBlock id="conflict-tool">git mergetool</CodeBlock>
              </div>
            </Section>

            <Section id="github" title="Connect to GitHub">
              <div className="space-y-4">
                <p className="text-slate-700">
                  After creating a repository on GitHub, connect your local repository to the remote.
                </p>

                <h4 className="font-semibold text-gray-900">Add remote repository:</h4>
                <CodeBlock id="remote-1">git remote add origin https://github.com/username/repo.git</CodeBlock>

                <h4 className="font-semibold text-gray-900">Using SSH (recommended):</h4>
                <CodeBlock id="remote-ssh">git remote add origin git@github.com:username/repo.git</CodeBlock>

                <h4 className="font-semibold text-gray-900">View remote repositories:</h4>
                <CodeBlock id="remote-view">git remote -v</CodeBlock>

                <h4 className="font-semibold text-gray-900">Change remote URL:</h4>
                <CodeBlock id="remote-change">git remote set-url origin https://github.com/username/new-repo.git</CodeBlock>

                <h4 className="font-semibold text-gray-900">Remove remote:</h4>
                <CodeBlock id="remote-remove">git remote remove origin</CodeBlock>

                <InfoBox type="info">
                  <strong>origin</strong> is the conventional name for your primary remote repository. 
                  You can have multiple remotes with different names.
                </InfoBox>
              </div>
            </Section>

            <Section id="pushpull" title="Push & Pull">
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900">Push commits to GitHub:</h4>
                <CodeBlock id="push-1">git push origin main</CodeBlock>

                <h4 className="font-semibold text-gray-900">Push and set upstream:</h4>
                <CodeBlock id="push-upstream">git push -u origin main</CodeBlock>
                <p className="text-sm text-slate-600">After this, you can simply use <code className="bg-slate-200 px-1 py-0.5 rounded text-xs">git push</code></p>

                <h4 className="font-semibold text-gray-900">Force push (use carefully!):</h4>
                <CodeBlock id="push-force">git push --force origin main</CodeBlock>

                <InfoBox type="warning">
                  Force push overwrites remote history. Only use when you're certain and coordinating with your team!
                </InfoBox>

                <h4 className="font-semibold text-gray-900 mt-6">Pull changes from GitHub:</h4>
                <CodeBlock id="pull-1">git pull origin main</CodeBlock>

                <h4 className="font-semibold text-gray-900">Fetch without merging:</h4>
                <CodeBlock id="fetch-1">git fetch origin</CodeBlock>
                <p className="text-sm text-slate-600">Downloads changes but doesn't merge them. Review before merging.</p>

                <h4 className="font-semibold text-gray-900">Pull with rebase:</h4>
                <CodeBlock id="pull-rebase">git pull --rebase origin main</CodeBlock>
              </div>
            </Section>

            <Section id="clone" title="Cloning Repositories">
              <div className="space-y-4">
                <p className="text-slate-700">
                  Cloning creates a local copy of a remote repository on your machine.
                </p>

                <h4 className="font-semibold text-gray-900">Clone a repository:</h4>
                <CodeBlock id="clone-1">git clone https://github.com/username/repo.git</CodeBlock>

                <h4 className="font-semibold text-gray-900">Clone into specific folder:</h4>
                <CodeBlock id="clone-folder">git clone https://github.com/username/repo.git my-folder</CodeBlock>

                <h4 className="font-semibold text-gray-900">Clone with SSH:</h4>
                <CodeBlock id="clone-ssh">git clone git@github.com:username/repo.git</CodeBlock>

                <h4 className="font-semibold text-gray-900">Clone specific branch:</h4>
                <CodeBlock id="clone-branch">git clone -b develop https://github.com/username/repo.git</CodeBlock>

                <h4 className="font-semibold text-gray-900">Shallow clone (faster, less history):</h4>
                <CodeBlock id="clone-shallow">git clone --depth 1 https://github.com/username/repo.git</CodeBlock>

                <InfoBox type="tip">
                  After cloning, Git automatically sets up the remote repository as 'origin' and tracks the default branch.
                </InfoBox>
              </div>
            </Section>

            <Section id="fork" title="Forking & Contributing">
              <div className="space-y-4">
                <p className="text-slate-700">
                  Forking creates your own copy of someone else's repository, allowing you to experiment and contribute.
                </p>

                <div className="bg-slate-50 rounded-xl p-4">
                  <h4 className="font-semibold mb-2 text-gray-900">Contribution Workflow:</h4>
                  <ol className="list-decimal pl-6 space-y-1 text-sm text-slate-700">
                    <li>Fork the repository on GitHub</li>
                    <li>Clone your fork locally</li>
                    <li>Create a new branch for your feature</li>
                    <li>Make changes and commit</li>
                    <li>Push to your fork</li>
                    <li>Create a Pull Request on GitHub</li>
                  </ol>
                </div>

                <h4 className="font-semibold text-gray-900 mt-4">Set up upstream remote:</h4>
                <CodeBlock id="fork-upstream">git remote add upstream https://github.com/original-owner/repo.git</CodeBlock>

                <h4 className="font-semibold text-gray-900">Sync with upstream:</h4>
                <CodeBlock id="fork-sync">git fetch upstream
git checkout main
git merge upstream/main</CodeBlock>
              </div>
            </Section>

            <Section id="pr" title="Pull Requests">
              <div className="space-y-4">
                <p className="text-slate-700">
                  Pull requests (PRs) let you propose changes and collaborate on GitHub. They facilitate code review and discussion.
                </p>

                <div className="bg-slate-50 rounded-xl p-4">
                  <h4 className="font-semibold mb-2 text-gray-900">Creating a Good Pull Request:</h4>
                  <ul className="list-disc pl-6 space-y-1 text-sm text-slate-700">
                    <li>Write a clear, descriptive title</li>
                    <li>Explain what changes you made and why</li>
                    <li>Reference related issues (e.g., "Fixes #123")</li>
                    <li>Keep PRs focused and reasonably sized</li>
                    <li>Respond to review comments promptly</li>
                    <li>Ensure all tests pass before requesting review</li>
                  </ul>
                </div>

                <InfoBox type="tip">
                  Use GitHub's PR templates to standardize your team's PR process and ensure important information is included.
                </InfoBox>
              </div>
            </Section>

            <Section id="issues" title="GitHub Issues">
              <div className="space-y-4">
                <p className="text-slate-700">
                  Issues are used to track bugs, feature requests, and other tasks in your project.
                </p>

                <div className="bg-slate-50 rounded-xl p-4">
                  <h4 className="font-semibold mb-2 text-gray-900">Issue Best Practices:</h4>
                  <ul className="list-disc pl-6 space-y-1 text-sm text-slate-700">
                    <li>Use descriptive titles that summarize the issue</li>
                    <li>Provide steps to reproduce bugs</li>
                    <li>Include screenshots or error messages when relevant</li>
                    <li>Label issues appropriately (bug, enhancement, documentation)</li>
                    <li>Assign issues to team members</li>
                    <li>Link related PRs and issues</li>
                  </ul>
                </div>

                <h4 className="font-semibold text-gray-900 mt-4">Close issues via commits:</h4>
                <CodeBlock id="issue-close">git commit -m "Fix navigation bug

Fixes #42"</CodeBlock>
                <p className="text-sm text-slate-600">Using keywords like "Fixes #42" automatically closes the issue when merged</p>
              </div>
            </Section>

            <Section id="advanced" title="Advanced Commands">
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900">Stash changes:</h4>
                <CodeBlock id="stash-1">git stash</CodeBlock>
                <p className="text-sm text-slate-600">Temporarily save uncommitted changes</p>

                <CodeBlock id="stash-apply">git stash pop</CodeBlock>
                <p className="text-sm text-slate-600">Apply and remove the most recent stash</p>

                <CodeBlock id="stash-list">git stash list</CodeBlock>
                <p className="text-sm text-slate-600">View all stashes</p>

                <h4 className="font-semibold text-gray-900 mt-6">Reset changes:</h4>
                <CodeBlock id="reset-soft">git reset --soft HEAD~1</CodeBlock>
                <p className="text-sm text-slate-600">Undo last commit, keep changes staged</p>

                <CodeBlock id="reset-hard">git reset --hard HEAD~1</CodeBlock>
                <p className="text-sm text-slate-600">Undo last commit and discard changes</p>

                <InfoBox type="warning">
                  <code className="bg-amber-100 px-1.5 py-0.5 rounded">--hard</code> permanently deletes changes. Use with caution!
                </InfoBox>

                <h4 className="font-semibold text-gray-900 mt-6">Revert a commit:</h4>
                <CodeBlock id="revert-1">git revert abc123</CodeBlock>
                <p className="text-sm text-slate-600">Creates a new commit that undoes a specific commit</p>

                <h4 className="font-semibold text-gray-900 mt-6">Cherry-pick a commit:</h4>
                <CodeBlock id="cherry-pick">git cherry-pick abc123</CodeBlock>
                <p className="text-sm text-slate-600">Apply a specific commit from another branch</p>

                <h4 className="font-semibold text-gray-900 mt-6">Rebase:</h4>
                <CodeBlock id="rebase-1">git rebase main</CodeBlock>
                <p className="text-sm text-slate-600">Reapply commits on top of another base</p>

                <h4 className="font-semibold text-gray-900 mt-6">Interactive rebase:</h4>
                <CodeBlock id="rebase-interactive">git rebase -i HEAD~3</CodeBlock>
                <p className="text-sm text-slate-600">Edit, squash, or reorder the last 3 commits</p>

                <h4 className="font-semibold text-gray-900 mt-6">View file changes:</h4>
                <CodeBlock id="diff-1">git diff</CodeBlock>
                <p className="text-sm text-slate-600">Show unstaged changes</p>

                <CodeBlock id="diff-staged">git diff --staged</CodeBlock>
                <p className="text-sm text-slate-600">Show staged changes</p>

                <h4 className="font-semibold text-gray-900 mt-6">Blame (find who changed what):</h4>
                <CodeBlock id="blame-1">git blame filename.js</CodeBlock>
                <p className="text-sm text-slate-600">Show who modified each line of a file</p>

                <h4 className="font-semibold text-gray-900 mt-6">Tag releases:</h4>
                <CodeBlock id="tag-1">git tag v1.0.0
git push origin v1.0.0</CodeBlock>
                <p className="text-sm text-slate-600">Create and push version tags</p>
              </div>
            </Section>

            <Section id="best" title="Best Practices">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                    <h4 className="font-semibold text-green-800 mb-3 flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5" />
                      Do's
                    </h4>
                    <ul className="list-disc pl-6 space-y-2 text-sm text-green-900">
                      <li>Commit small, logical changes frequently</li>
                      <li>Write clear, descriptive commit messages</li>
                      <li>Pull before pushing to avoid conflicts</li>
                      <li>Create feature branches for new work</li>
                      <li>Review your changes before committing</li>
                      <li>Use .gitignore from the start</li>
                      <li>Keep your main branch stable</li>
                      <li>Document your workflow in README</li>
                    </ul>
                  </div>

                  <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                    <h4 className="font-semibold text-red-800 mb-3 flex items-center gap-2">
                      <AlertCircle className="w-5 h-5" />
                      Don'ts
                    </h4>
                    <ul className="list-disc pl-6 space-y-2 text-sm text-red-900">
                      <li>Don't commit sensitive data (.env files, passwords)</li>
                      <li>Don't force push to shared branches</li>
                      <li>Don't commit large binary files</li>
                      <li>Don't use vague commit messages</li>
                      <li>Don't work directly on main/master</li>
                      <li>Don't commit commented-out code</li>
                      <li>Don't ignore merge conflicts</li>
                      <li>Don't push untested code</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mt-4">
                  <h4 className="font-semibold text-blue-800 mb-3">Commit Message Conventions</h4>
                  <div className="space-y-2 text-sm text-blue-900">
                    <p><code className="bg-blue-100 px-2 py-0.5 rounded">feat:</code> New feature</p>
                    <p><code className="bg-blue-100 px-2 py-0.5 rounded">fix:</code> Bug fix</p>
                    <p><code className="bg-blue-100 px-2 py-0.5 rounded">docs:</code> Documentation changes</p>
                    <p><code className="bg-blue-100 px-2 py-0.5 rounded">style:</code> Code style changes (formatting)</p>
                    <p><code className="bg-blue-100 px-2 py-0.5 rounded">refactor:</code> Code refactoring</p>
                    <p><code className="bg-blue-100 px-2 py-0.5 rounded">test:</code> Adding or updating tests</p>
                    <p><code className="bg-blue-100 px-2 py-0.5 rounded">chore:</code> Maintenance tasks</p>
                  </div>
                </div>

                <InfoBox type="tip">
                  <strong>Pro Tip:</strong> Set up Git aliases to save time on common commands:
                  <br />
                  <code className="bg-green-100 px-2 py-0.5 rounded text-xs mt-2 block">
                    git config --global alias.co checkout
                    <br />
                    git config --global alias.br branch
                    <br />
                    git config --global alias.st status
                  </code>
                </InfoBox>
              </div>
            </Section>

            <div className="bg-gradient-to-r from-gray-50 to-slate-100 border p-8 rounded-2xl text-center">
              <h3 className="text-2xl font-bold mb-3">Ready to Test Your Git Knowledge?</h3>
              <p className="text-slate-600 mb-6">Take our interactive quiz to see how much you've learned!</p>
              <button
                onClick={() => navigate("/gitgithub")}
                className="px-8 py-4 bg-gray-800 text-white rounded-xl font-semibold inline-flex items-center gap-2 hover:bg-gray-700 transition-colors shadow-lg"
              >
                Start Git Quiz <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default GitGithubLearn;
