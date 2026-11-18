export interface CodeToken {
  text: string;
  className: string;
}

const CONTROL_KEYWORDS = new Set([
  'import',
  'from',
  'export',
  'return',
  'if',
  'else',
  'switch',
  'case',
  'for',
  'of',
  'track',
  'as',
  'await',
  'try',
  'catch',
  'throw',
]);

const DECL_KEYWORDS = new Set([
  'class',
  'interface',
  'type',
  'const',
  'let',
  'function',
  'protected',
  'private',
  'public',
  'readonly',
  'static',
  'async',
  'new',
  'this',
  'true',
  'false',
  'null',
  'undefined',
  'void',
  'implements',
  'extends',
  'string',
  'number',
  'boolean',
]);

const CALLABLE_NAMES = new Set([
  'signal',
  'computed',
  'linkedSignal',
  'effect',
  'httpResource',
  'input',
  'output',
  'model',
  'inject',
  'viewChild',
  'form',
  'required',
  'min',
  'max',
  'minLength',
  'validate',
  'toObservable',
  'toSignal',
  'pipe',
  'debounceTime',
  'distinctUntilChanged',
  'switchMap',
  'tap',
  'map',
  'filter',
  'update',
  'set',
  'get',
  'post',
  'describe',
  'it',
  'expect',
  'beforeEach',
  'transform',
  'onClick',
  'toggle',
]);

const TOKEN_REGEX_TS =
  /(\/\/.*$|'(?:\\.|[^'\\])*'|"(?:\\.|[^"\\])*"|`(?:\\.|[^`\\])*`|@[A-Za-z_]\w*|\b\d+(?:\.\d+)?\b|\b[A-Za-z_$][\w$]*\b|[{}()[\].,:;?+-/*=<>!&|]+|\s+)/g;

const TOKEN_REGEX_HTML =
  /(<!--.*?-->|\{\{.*?\}\}|@[a-z]+\b|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|<\/?[A-Za-z][\w-]*|\/?>|\[\([A-Za-z0-9_.-]+\)\]|\[[A-Za-z0-9_.-]+\]|\([A-Za-z0-9_.-]+\)|#[A-Za-z_]\w*|\s+|[^\s<>{}[\]"'@#()]+)/g;

export function tokenizeCodeLine(line: string, lang: 'ts' | 'html'): CodeToken[] {
  if (!line) {
    return [{ text: ' ', className: 'text-[#d4d4d4]' }];
  }

  const tokens: CodeToken[] = [];
  const regex = lang === 'ts' ? TOKEN_REGEX_TS : TOKEN_REGEX_HTML;
  regex.lastIndex = 0;

  let match: RegExpExecArray | null;
  while ((match = regex.exec(line)) !== null) {
    const part = match[0];
    let className = 'text-[#d4d4d4]';

    if (lang === 'ts') {
      if (part.startsWith('//')) {
        className = 'text-[#6a9955] italic';
      } else if (part.startsWith("'") || part.startsWith('"') || part.startsWith('`')) {
        className = 'text-[#ce9178]';
      } else if (part.startsWith('@')) {
        className = 'text-[#dcdcaa] font-semibold';
      } else if (/^\d/.test(part)) {
        className = 'text-[#b5cea8]';
      } else if (CONTROL_KEYWORDS.has(part)) {
        className = 'text-[#c586c0]';
      } else if (DECL_KEYWORDS.has(part)) {
        className = 'text-[#569cd6]';
      } else if (CALLABLE_NAMES.has(part)) {
        className = 'text-[#dcdcaa]';
      } else if (/^[A-Z][\w$]*$/.test(part)) {
        className = 'text-[#4ec9b0]';
      } else if (/^[a-z_$][\w$]*$/.test(part)) {
        className = 'text-[#9cdcfe]';
      } else if (/^[{}()[\]]$/.test(part)) {
        className = 'text-[#ffd700]';
      }
    } else {
      if (part.startsWith('<!--')) {
        className = 'text-[#6a9955] italic';
      } else if (part.startsWith('{{')) {
        className = 'text-[#ffd700]';
      } else if (part.startsWith('@')) {
        className = 'text-[#c586c0] font-semibold';
      } else if (part.startsWith('"') || part.startsWith("'")) {
        className = 'text-[#ce9178]';
      } else if (part.startsWith('<')) {
        className = 'text-[#569cd6]';
      } else if (part === '>' || part === '/>') {
        className = 'text-[#569cd6]';
      } else if (
        part.startsWith('[') ||
        part.startsWith('(') ||
        part.startsWith('#')
      ) {
        className = 'text-[#9cdcfe]';
      }
    }

    tokens.push({ text: part, className });
  }

  return tokens.length > 0 ? tokens : [{ text: line, className: 'text-[#d4d4d4]' }];
}
