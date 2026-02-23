import React, { useEffect, useMemo, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, Code2, ArrowRight, Copy, Check, Info, AlertCircle, CheckCircle2, Database } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function TypeScriptLearn() {
  const navigate = useNavigate();
  const [copiedId, setCopiedId] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const sections = useMemo(
    () => [
      { id: "intro", title: "What is TypeScript?" },
      { id: "basics", title: "Basic Types" },
      { id: "interfaces", title: "Interfaces & Types" },
      { id: "functions", title: "Functions" },
      { id: "classes", title: "Classes" },
      { id: "generics", title: "Generics" },
      { id: "enums", title: "Enums" },
      { id: "union", title: "Union & Intersection" },
      { id: "advanced", title: "Advanced Types" },
      { id: "decorators", title: "Decorators" },
      { id: "best", title: "Best Practices" },
    ],
    []
  );

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

  const CodeBlock = ({ children, id, language = "typescript" }) => {
    const blockId = `code-${id}`;
    const isCopied = copiedId === blockId;

    return (
      <div className="relative group">
        <div className="absolute top-3 right-3 flex items-center gap-2 z-10">
          <span className="text-xs text-gray-400 bg-gray-800 px-2 py-1 rounded">{language}</span>
          <button
            onClick={() => copyToClipboard(children, blockId)}
            className="text-xs flex items-center gap-1 bg-gray-800 hover:bg-gray-700 text-gray-300 px-2 py-1 rounded transition-colors"
          >
            {isCopied ? <Check size={14} /> : <Copy size={14} />}
            {isCopied ? "Copied" : "Copy"}
          </button>
        </div>
        <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
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
      info: <Info size={20} />,
      tip: <CheckCircle2 size={20} />,
      warning: <AlertCircle size={20} />,
    };

    return (
      <div className={`border-l-4 p-4 rounded ${styles[type]} flex gap-3`}>
        <div className="flex-shrink-0">{icons[type]}</div>
        <div>{children}</div>
      </div>
    );
  };

  const Section = ({ id, title, children }) => (
    <section id={id} className="scroll-mt-32 mb-16">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">{title}</h2>
      {children}
    </section>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <AnimatePresence>
        {copiedId && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 right-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg z-50 flex items-center gap-2"
          >
            <Check size={18} />
            Code copied!
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Code2 size={16} />
            Complete TypeScript Guide
          </div>
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            TypeScript Complete Learning Guide
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Learn TypeScript step by step from basics to advanced types.
          </p>

          <div className="flex gap-4 justify-center">
            <button
              onClick={() => navigate("/typescriptquiz")}
              className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              Start TypeScript Quiz
              <ArrowRight size={20} />
            </button>
            <button
              onClick={() => scrollTo("basics")}
              className="px-6 py-3 border border-gray-400 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
            >
              Jump to Basics
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1">
            <div className="sticky top-24 bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <h3 className="font-semibold mb-4 flex items-center gap-2 text-gray-800">
                <BookOpen size={18} />
                Contents
              </h3>
              <nav className="space-y-1">
                {sections.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => scrollTo(s.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      activeId === s.id
                        ? "bg-blue-600 text-white"
                        : "hover:bg-gray-100 text-gray-700"
                    }`}
                  >
                    {s.title}
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          <main className="lg:col-span-3 space-y-8">
            <Section id="intro" title="What is TypeScript?">
              <div className="prose max-w-none space-y-4">
                <p className="text-gray-700 text-lg leading-relaxed">
                  TypeScript is a strongly typed programming language that builds on JavaScript, giving you better tooling at any scale.
                </p>
                <InfoBox type="tip">
                  TypeScript adds static types to JavaScript, catching errors at compile-time rather than runtime.
                </InfoBox>
                <CodeBlock id="intro-1">
{`// JavaScript
let message = "Hello";
message = 42; // No error

// TypeScript
let message: string = "Hello";
message = 42; // Error: Type 'number' is not assignable to type 'string'`}
                </CodeBlock>
              </div>
            </Section>

            <Section id="basics" title="Basic Types">
              <div className="prose max-w-none space-y-4">
                <p className="text-gray-700">TypeScript provides several basic types for common values.</p>
                
                <h3 className="text-xl font-semibold mt-6 mb-3">Primitive Types</h3>
                <CodeBlock id="basics-1">
{`// String
let name: string = "Alice";

// Number
let age: number = 25;

// Boolean
let isActive: boolean = true;

// Null and Undefined
let nothing: null = null;
let notDefined: undefined = undefined;`}
                </CodeBlock>

                <h3 className="text-xl font-semibold mt-6 mb-3">Arrays</h3>
                <CodeBlock id="basics-2">
{`// Array of numbers
let numbers: number[] = [1, 2, 3, 4, 5];

// Array of strings (alternative syntax)
let names: Array<string> = ["Alice", "Bob", "Carol"];`}
                </CodeBlock>

                <h3 className="text-xl font-semibold mt-6 mb-3">Any and Unknown</h3>
                <CodeBlock id="basics-3">
{`// Any - disables type checking
let anything: any = 42;
anything = "string";
anything = true;

// Unknown - safer alternative to any
let value: unknown = 42;
if (typeof value === "number") {
  let num: number = value; // Type narrowing required
}`}
                </CodeBlock>

                <InfoBox type="warning">
                  Avoid using <code>any</code> when possible. It defeats the purpose of TypeScript's type safety.
                </InfoBox>
              </div>
            </Section>

            <Section id="interfaces" title="Interfaces & Types">
              <div className="prose max-w-none space-y-4">
                <p className="text-gray-700">Interfaces and type aliases define the shape of objects.</p>
                
                <h3 className="text-xl font-semibold mt-6 mb-3">Interfaces</h3>
                <CodeBlock id="interfaces-1">
{`interface User {
  id: number;
  name: string;
  email: string;
  age?: number; // Optional property
}

const user: User = {
  id: 1,
  name: "Alice",
  email: "alice@example.com"
};`}
                </CodeBlock>

                <h3 className="text-xl font-semibold mt-6 mb-3">Type Aliases</h3>
                <CodeBlock id="interfaces-2">
{`type Point = {
  x: number;
  y: number;
};

type ID = string | number;

const point: Point = { x: 10, y: 20 };
const userId: ID = 123;`}
                </CodeBlock>

                <h3 className="text-xl font-semibold mt-6 mb-3">Extending Interfaces</h3>
                <CodeBlock id="interfaces-3">
{`interface Animal {
  name: string;
}

interface Dog extends Animal {
  breed: string;
}

const dog: Dog = {
  name: "Max",
  breed: "Golden Retriever"
};`}
                </CodeBlock>

                <InfoBox type="info">
                  Use interfaces for object shapes that may be extended. Use type aliases for unions, primitives, and tuples.
                </InfoBox>
              </div>
            </Section>

            <Section id="functions" title="Functions">
              <div className="prose max-w-none space-y-4">
                <p className="text-gray-700">TypeScript allows you to specify types for function parameters and return values.</p>
                
                <h3 className="text-xl font-semibold mt-6 mb-3">Basic Function Types</h3>
                <CodeBlock id="functions-1">
{`// Function with typed parameters and return type
function add(a: number, b: number): number {
  return a + b;
}

// Arrow function
const multiply = (a: number, b: number): number => a * b;

// Void return type
function logMessage(message: string): void {
  console.log(message);
}`}
                </CodeBlock>

                <h3 className="text-xl font-semibold mt-6 mb-3">Optional and Default Parameters</h3>
                <CodeBlock id="functions-2">
{`// Optional parameter
function greet(name: string, greeting?: string): string {
  return \`\${greeting || "Hello"}, \${name}!\`;
}

// Default parameter
function createUser(name: string, role: string = "user"): object {
  return { name, role };
}`}
                </CodeBlock>

                <h3 className="text-xl font-semibold mt-6 mb-3">Function Types</h3>
                <CodeBlock id="functions-3">
{`// Function type
type MathOperation = (a: number, b: number) => number;

const subtract: MathOperation = (a, b) => a - b;
const divide: MathOperation = (a, b) => a / b;`}
                </CodeBlock>
              </div>
            </Section>

            <Section id="classes" title="Classes">
              <div className="prose max-w-none space-y-4">
                <p className="text-gray-700">TypeScript classes support object-oriented programming with types.</p>
                
                <h3 className="text-xl font-semibold mt-6 mb-3">Basic Class</h3>
                <CodeBlock id="classes-1">
{`class Person {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  greet(): string {
    return \`Hello, I'm \${this.name}\`;
  }
}

const person = new Person("Alice", 25);
console.log(person.greet());`}
                </CodeBlock>

                <h3 className="text-xl font-semibold mt-6 mb-3">Access Modifiers</h3>
                <CodeBlock id="classes-2">
{`class BankAccount {
  public accountNumber: string;
  private balance: number;
  protected owner: string;

  constructor(accountNumber: string, owner: string) {
    this.accountNumber = accountNumber;
    this.balance = 0;
    this.owner = owner;
  }

  public deposit(amount: number): void {
    this.balance += amount;
  }

  public getBalance(): number {
    return this.balance;
  }
}`}
                </CodeBlock>

                <h3 className="text-xl font-semibold mt-6 mb-3">Inheritance</h3>
                <CodeBlock id="classes-3">
{`class Animal {
  constructor(public name: string) {}

  move(distance: number): void {
    console.log(\`\${this.name} moved \${distance}m\`);
  }
}

class Dog extends Animal {
  bark(): void {
    console.log("Woof! Woof!");
  }
}

const dog = new Dog("Max");
dog.bark();
dog.move(10);`}
                </CodeBlock>

                <InfoBox type="tip">
                  Use <code>public</code> (default), <code>private</code>, and <code>protected</code> to control access to class members.
                </InfoBox>
              </div>
            </Section>

            <Section id="generics" title="Generics">
              <div className="prose max-w-none space-y-4">
                <p className="text-gray-700">Generics allow you to write reusable, type-safe code.</p>
                
                <h3 className="text-xl font-semibold mt-6 mb-3">Generic Functions</h3>
                <CodeBlock id="generics-1">
{`// Generic function
function identity<T>(arg: T): T {
  return arg;
}

let num = identity<number>(42);
let str = identity<string>("hello");

// Type inference
let value = identity(100); // T inferred as number`}
                </CodeBlock>

                <h3 className="text-xl font-semibold mt-6 mb-3">Generic Interfaces</h3>
                <CodeBlock id="generics-2">
{`interface Box<T> {
  value: T;
}

const numberBox: Box<number> = { value: 42 };
const stringBox: Box<string> = { value: "hello" };`}
                </CodeBlock>

                <h3 className="text-xl font-semibold mt-6 mb-3">Generic Classes</h3>
                <CodeBlock id="generics-3">
{`class DataStore<T> {
  private data: T[] = [];

  add(item: T): void {
    this.data.push(item);
  }

  get(index: number): T | undefined {
    return this.data[index];
  }
}

const numberStore = new DataStore<number>();
numberStore.add(1);
numberStore.add(2);`}
                </CodeBlock>

                <InfoBox type="info">
                  Generics provide a way to make components work with any data type while maintaining type safety.
                </InfoBox>
              </div>
            </Section>

            <Section id="enums" title="Enums">
              <div className="prose max-w-none space-y-4">
                <p className="text-gray-700">Enums allow you to define a set of named constants.</p>
                
                <h3 className="text-xl font-semibold mt-6 mb-3">Numeric Enums</h3>
                <CodeBlock id="enums-1">
{`enum Direction {
  Up,    // 0
  Down,  // 1
  Left,  // 2
  Right  // 3
}

let dir: Direction = Direction.Up;

// Custom values
enum Status {
  Pending = 1,
  Active = 2,
  Inactive = 3
}`}
                </CodeBlock>

                <h3 className="text-xl font-semibold mt-6 mb-3">String Enums</h3>
                <CodeBlock id="enums-2">
{`enum Color {
  Red = "RED",
  Green = "GREEN",
  Blue = "BLUE"
}

let favoriteColor: Color = Color.Blue;
console.log(favoriteColor); // "BLUE"`}
                </CodeBlock>

                <h3 className="text-xl font-semibold mt-6 mb-3">Const Enums</h3>
                <CodeBlock id="enums-3">
{`const enum LogLevel {
  Error,
  Warning,
  Info
}

let level: LogLevel = LogLevel.Error;`}
                </CodeBlock>

                <InfoBox type="tip">
                  Use <code>const enum</code> for better performance as it's inlined at compile time.
                </InfoBox>
              </div>
            </Section>

            <Section id="union" title="Union & Intersection Types">
              <div className="prose max-w-none space-y-4">
                <p className="text-gray-700">Union and intersection types allow for more flexible type definitions.</p>
                
                <h3 className="text-xl font-semibold mt-6 mb-3">Union Types</h3>
                <CodeBlock id="union-1">
{`// Union type - value can be one of several types
type StringOrNumber = string | number;

function printId(id: StringOrNumber): void {
  if (typeof id === "string") {
    console.log(\`ID: \${id.toUpperCase()}\`);
  } else {
    console.log(\`ID: \${id}\`);
  }
}

printId("abc123");
printId(12345);`}
                </CodeBlock>

                <h3 className="text-xl font-semibold mt-6 mb-3">Intersection Types</h3>
                <CodeBlock id="union-2">
{`// Intersection type - combines multiple types
interface Person {
  name: string;
}

interface Employee {
  employeeId: number;
}

type Staff = Person & Employee;

const staff: Staff = {
  name: "Alice",
  employeeId: 1001
};`}
                </CodeBlock>

                <h3 className="text-xl font-semibold mt-6 mb-3">Type Guards</h3>
                <CodeBlock id="union-3">
{`type Fish = { swim: () => void };
type Bird = { fly: () => void };

function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined;
}

function move(pet: Fish | Bird) {
  if (isFish(pet)) {
    pet.swim();
  } else {
    pet.fly();
  }
}`}
                </CodeBlock>
              </div>
            </Section>

            <Section id="advanced" title="Advanced Types">
              <div className="prose max-w-none space-y-4">
                <p className="text-gray-700">TypeScript offers powerful advanced type features.</p>
                
                <h3 className="text-xl font-semibold mt-6 mb-3">Utility Types</h3>
                <CodeBlock id="advanced-1">
{`interface User {
  id: number;
  name: string;
  email: string;
}

// Partial - makes all properties optional
type PartialUser = Partial<User>;

// Required - makes all properties required
type RequiredUser = Required<User>;

// Readonly - makes all properties readonly
type ReadonlyUser = Readonly<User>;

// Pick - selects specific properties
type UserPreview = Pick<User, "id" | "name">;

// Omit - excludes specific properties
type UserWithoutEmail = Omit<User, "email">;`}
                </CodeBlock>

                <h3 className="text-xl font-semibold mt-6 mb-3">Mapped Types</h3>
                <CodeBlock id="advanced-2">
{`type Optional<T> = {
  [P in keyof T]?: T[P];
};

type Nullable<T> = {
  [P in keyof T]: T[P] | null;
};

interface Product {
  name: string;
  price: number;
}

type OptionalProduct = Optional<Product>;
type NullableProduct = Nullable<Product>;`}
                </CodeBlock>

                <h3 className="text-xl font-semibold mt-6 mb-3">Conditional Types</h3>
                <CodeBlock id="advanced-3">
{`type IsString<T> = T extends string ? true : false;

type A = IsString<string>;  // true
type B = IsString<number>;  // false

// Exclude null and undefined
type NonNullable<T> = T extends null | undefined ? never : T;`}
                </CodeBlock>

                <InfoBox type="info">
                  Utility types like Partial, Pick, and Omit are built into TypeScript and save time.
                </InfoBox>
              </div>
            </Section>

            <Section id="decorators" title="Decorators">
              <div className="prose max-w-none space-y-4">
                <p className="text-gray-700">Decorators are special declarations that can be attached to classes, methods, properties, or parameters.</p>
                
                <InfoBox type="warning">
                  Decorators are an experimental feature. Enable them in tsconfig.json with <code>"experimentalDecorators": true</code>
                </InfoBox>

                <h3 className="text-xl font-semibold mt-6 mb-3">Class Decorators</h3>
                <CodeBlock id="decorators-1">
{`function sealed(constructor: Function) {
  Object.seal(constructor);
  Object.seal(constructor.prototype);
}

@sealed
class Greeter {
  greeting: string;
  constructor(message: string) {
    this.greeting = message;
  }
}`}
                </CodeBlock>

                <h3 className="text-xl font-semibold mt-6 mb-3">Method Decorators</h3>
                <CodeBlock id="decorators-2">
{`function log(target: any, key: string, descriptor: PropertyDescriptor) {
  const original = descriptor.value;
  descriptor.value = function(...args: any[]) {
    console.log(\`Calling \${key} with\`, args);
    return original.apply(this, args);
  };
  return descriptor;
}

class Calculator {
  @log
  add(a: number, b: number): number {
    return a + b;
  }
}`}
                </CodeBlock>
              </div>
            </Section>

            <Section id="best" title="Best Practices">
              <div className="prose max-w-none space-y-4">
                <div className="grid gap-4">
                  <InfoBox type="tip">
                    <strong>Enable strict mode</strong> in tsconfig.json for maximum type safety
                  </InfoBox>
                  
                  <InfoBox type="tip">
                    <strong>Avoid using 'any'</strong> - use 'unknown' instead and narrow types
                  </InfoBox>
                  
                  <InfoBox type="tip">
                    <strong>Use interfaces for objects</strong> that will be extended or implemented
                  </InfoBox>
                  
                  <InfoBox type="tip">
                    <strong>Leverage type inference</strong> - don't annotate types when TypeScript can infer them
                  </InfoBox>
                  
                  <InfoBox type="tip">
                    <strong>Use utility types</strong> like Partial, Pick, Omit to transform existing types
                  </InfoBox>
                  
                  <InfoBox type="tip">
                    <strong>Keep types DRY</strong> - extract common types into reusable type aliases
                  </InfoBox>
                </div>

                <h3 className="text-xl font-semibold mt-8 mb-3">TypeScript Configuration</h3>
                <CodeBlock id="best-1" language="json">
{`{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "noImplicitAny": true,
    "strictNullChecks": true
  }
}`}
                </CodeBlock>
              </div>
            </Section>

            <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to Test Your TypeScript Knowledge?</h2>
              <p className="text-blue-100 mb-6">
                Take the quiz to assess what you've learned!
              </p>
              <button
                onClick={() => navigate("/typescriptquiz")}
                className="px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold hover:bg-gray-100 transition-colors inline-flex items-center gap-2"
              >
                Start TypeScript Quiz
                <ArrowRight size={20} />
              </button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default TypeScriptLearn;