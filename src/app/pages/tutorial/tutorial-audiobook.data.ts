import { StepId } from './tutorial-steps';

export type NarratorVoiceId = 'gonzalo' | 'dalia';

export interface AudiobookCue {
  start: number;
  end: number;
  text: string;
}

export interface AudiobookVoiceTrack {
  audioUrl: string;
  durationSec: number;
  cues: AudiobookCue[];
}

export interface AudiobookVoiceOption {
  id: NarratorVoiceId;
  label: string;
  subtitle: string;
  fullAudiobookUrl: string;
  totalDurationSec: number;
}

export interface AudiobookChapter {
  stepId: StepId;
  chapterTitle: string;
  tracks: Record<NarratorVoiceId, AudiobookVoiceTrack>;
}

export const AUDIOBOOK_VOICES: AudiobookVoiceOption[] = [
  {
    "id": "gonzalo",
    "label": "Profesor Gonzalo (CL)",
    "subtitle": "Voz IA Neuronal · Español Latino (Chile)",
    "fullAudiobookUrl": "audiobook/gonzalo/audiolibro-angular22-gonzalo.mp3",
    "totalDurationSec": 576.05
  },
  {
    "id": "dalia",
    "label": "Mentora Dalia (CL)",
    "subtitle": "Voz IA Neuronal · Español Latino (Chile)",
    "fullAudiobookUrl": "audiobook/dalia/audiolibro-angular22-dalia.mp3",
    "totalDurationSec": 597.68
  }
];

export const AUDIOBOOK_CHAPTERS: AudiobookChapter[] = [
  {
    "stepId": 1,
    "chapterTitle": "Capítulo 1 · Anatomía de un Componente e Interpolación",
    "tracks": {
      "gonzalo": {
        "audioUrl": "audiobook/gonzalo/capitulo-01.mp3",
        "durationSec": 51.78,
        "cues": [
          {
            "start": 0.14,
            "end": 9.02,
            "text": "¡Hola! Bienvenido al audiolibro práctico de Angular 22 con Pokémon. Partimos el Nivel Básico con el Capítulo 1: Anatomía de un Componente e Interpolación."
          },
          {
            "start": 9.47,
            "end": 18.02,
            "text": "En Angular moderno, cada tarjeta, botón o pantalla de tu Pokédex es una pieza autónoma (standalone por defecto), sin necesidad de antiguos módulos."
          },
          {
            "start": 18.37,
            "end": 28.18,
            "text": "Imagina @Component como una Pokébola donde conviven tres cosas: una clase de TypeScript con tus datos, una plantilla HTML con la estructura y estilos encapsulados."
          },
          {
            "start": 28.6,
            "end": 35.23,
            "text": "Si vienes de React o de Vue, te vas a sentir como en casa viendo lo limpio que queda separar lógica y diseño manteniendo todo tipado."
          },
          {
            "start": 35.61,
            "end": 44.73,
            "text": "Para mostrar cualquier dato en pantalla, solo abres llaves dobles {{ }}. Por ejemplo, mostrar el nombre de Bulbasaur o multiplicar 6.9 kg por 1000 para verlo en gramos."
          },
          {
            "start": 45.08,
            "end": 51.33,
            "text": "Prueba cambiar entre Bulbasaur, Charmander y Squirtle en el laboratorio en vivo para ver cómo la misma plantilla cobra vida al instante."
          }
        ]
      },
      "dalia": {
        "audioUrl": "audiobook/dalia/capitulo-01.mp3",
        "durationSec": 53.27,
        "cues": [
          {
            "start": 0.14,
            "end": 9.66,
            "text": "¡Hola! Bienvenido al audiolibro práctico de Angular 22 con Pokémon. Partimos el Nivel Básico con el Capítulo 1: Anatomía de un Componente e Interpolación."
          },
          {
            "start": 10.11,
            "end": 18.61,
            "text": "En Angular moderno, cada tarjeta, botón o pantalla de tu Pokédex es una pieza autónoma (standalone por defecto), sin necesidad de antiguos módulos."
          },
          {
            "start": 18.96,
            "end": 29.04,
            "text": "Imagina @Component como una Pokébola donde conviven tres cosas: una clase de TypeScript con tus datos, una plantilla HTML con la estructura y estilos encapsulados."
          },
          {
            "start": 29.46,
            "end": 36.42,
            "text": "Si vienes de React o de Vue, te vas a sentir como en casa viendo lo limpio que queda separar lógica y diseño manteniendo todo tipado."
          },
          {
            "start": 36.8,
            "end": 45.93,
            "text": "Para mostrar cualquier dato en pantalla, solo abres llaves dobles {{ }}. Por ejemplo, mostrar el nombre de Bulbasaur o multiplicar 6.9 kg por 1000 para verlo en gramos."
          },
          {
            "start": 46.28,
            "end": 52.82,
            "text": "Prueba cambiar entre Bulbasaur, Charmander y Squirtle en el laboratorio en vivo para ver cómo la misma plantilla cobra vida al instante."
          }
        ]
      }
    }
  },
  {
    "stepId": 2,
    "chapterTitle": "Capítulo 2 · Propiedades, Eventos y Referencias en el DOM",
    "tracks": {
      "gonzalo": {
        "audioUrl": "audiobook/gonzalo/capitulo-02.mp3",
        "durationSec": 45.83,
        "cues": [
          {
            "start": 0.14,
            "end": 4.18,
            "text": "Capítulo 2: Enlaces del DOM con propiedades, eventos y referencias locales."
          },
          {
            "start": 4.63,
            "end": 12.71,
            "text": "Un Centro Pokémon necesita reaccionar a cada clic y actualizar la salud al segundo. Para eso, Angular separa visualmente hacia dónde viajan los datos."
          },
          {
            "start": 13.06,
            "end": 21.06,
            "text": "Cuando rodeas un atributo con corchetes, como [src] o [disabled], el dato fluye desde TypeScript hacia el elemento HTML."
          },
          {
            "start": 21.41,
            "end": 28.85,
            "text": "Incluso puedes enlazar estilos con unidades directas, como [style.width.%] en la barra de vida de Charmander, sin concatenar textos a mano."
          },
          {
            "start": 29.27,
            "end": 37.27,
            "text": "Al revés, los paréntesis escuchan eventos que salen del usuario, como (click) en Usar Poción para sumar 25 PS, o pulsar Enter."
          },
          {
            "start": 37.62,
            "end": 45.38,
            "text": "Y si colocas #ref en un campo de texto, obtienes una referencia directa en la plantilla, olvidándote de buscar nodos con querySelector."
          }
        ]
      },
      "dalia": {
        "audioUrl": "audiobook/dalia/capitulo-02.mp3",
        "durationSec": 46.24,
        "cues": [
          {
            "start": 0.14,
            "end": 4.44,
            "text": "Capítulo 2: Enlaces del DOM con propiedades, eventos y referencias locales."
          },
          {
            "start": 4.89,
            "end": 12.77,
            "text": "Un Centro Pokémon necesita reaccionar a cada clic y actualizar la salud al segundo. Para eso, Angular separa visualmente hacia dónde viajan los datos."
          },
          {
            "start": 13.12,
            "end": 21.41,
            "text": "Cuando rodeas un atributo con corchetes, como [src] o [disabled], el dato fluye desde TypeScript hacia el elemento HTML."
          },
          {
            "start": 21.76,
            "end": 29.12,
            "text": "Incluso puedes enlazar estilos con unidades directas, como [style.width.%] en la barra de vida de Charmander, sin concatenar textos a mano."
          },
          {
            "start": 29.54,
            "end": 37.78,
            "text": "Al revés, los paréntesis escuchan eventos que salen del usuario, como (click) en Usar Poción para sumar 25 PS, o pulsar Enter."
          },
          {
            "start": 38.13,
            "end": 45.79,
            "text": "Y si colocas #ref en un campo de texto, obtienes una referencia directa en la plantilla, olvidándote de buscar nodos con querySelector."
          }
        ]
      }
    }
  },
  {
    "stepId": 3,
    "chapterTitle": "Capítulo 3 · Transformación visual con Pipes nativos y personalizados",
    "tracks": {
      "gonzalo": {
        "audioUrl": "audiobook/gonzalo/capitulo-03.mp3",
        "durationSec": 45.91,
        "cues": [
          {
            "start": 0.14,
            "end": 4.05,
            "text": "Capítulo 3: Transformación visual con Pipes nativos y personalizados."
          },
          {
            "start": 4.5,
            "end": 12.66,
            "text": "Una regla de oro en ingeniería es jamás ensuciar tus datos originales solo por estética. El 25 de Pikachu debe seguir siendo un número puro en tu lógica."
          },
          {
            "start": 13.04,
            "end": 20.48,
            "text": "Aquí entran los Pipes, inspirados en la barra vertical (|) de Unix: el valor crudo entra por la izquierda y sale formateado hacia la vista."
          },
          {
            "start": 20.86,
            "end": 29.02,
            "text": "Angular trae listos transformadores de uso diario: uppercase para Snorlax, percent para tasas de captura o currency para precios en dólares."
          },
          {
            "start": 29.37,
            "end": 36.87,
            "text": "Y cuando necesitas un formato propio, creas una clase con @Pipe, como nuestro PokeIdPipe que rellena ceros a la izquierda (#025)."
          },
          {
            "start": 37.22,
            "end": 45.46,
            "text": "Como los Pipes son puros, Angular memoriza el resultado y solo recalcula si cambia la entrada. Pruébalo abajo cambiando la cantidad de dígitos."
          }
        ]
      },
      "dalia": {
        "audioUrl": "audiobook/dalia/capitulo-03.mp3",
        "durationSec": 47.35,
        "cues": [
          {
            "start": 0.14,
            "end": 4.21,
            "text": "Capítulo 3: Transformación visual con Pipes nativos y personalizados."
          },
          {
            "start": 4.66,
            "end": 13.38,
            "text": "Una regla de oro en ingeniería es jamás ensuciar tus datos originales solo por estética. El 25 de Pikachu debe seguir siendo un número puro en tu lógica."
          },
          {
            "start": 13.76,
            "end": 21.51,
            "text": "Aquí entran los Pipes, inspirados en la barra vertical (|) de Unix: el valor crudo entra por la izquierda y sale formateado hacia la vista."
          },
          {
            "start": 21.89,
            "end": 30.42,
            "text": "Angular trae listos transformadores de uso diario: uppercase para Snorlax, percent para tasas de captura o currency para precios en dólares."
          },
          {
            "start": 30.77,
            "end": 38.06,
            "text": "Y cuando necesitas un formato propio, creas una clase con @Pipe, como nuestro PokeIdPipe que rellena ceros a la izquierda (#025)."
          },
          {
            "start": 38.41,
            "end": 46.9,
            "text": "Como los Pipes son puros, Angular memoriza el resultado y solo recalcula si cambia la entrada. Pruébalo abajo cambiando la cantidad de dígitos."
          }
        ]
      }
    }
  },
  {
    "stepId": 4,
    "chapterTitle": "Capítulo 4 · Control de flujo moderno en plantillas",
    "tracks": {
      "gonzalo": {
        "audioUrl": "audiobook/gonzalo/capitulo-04.mp3",
        "durationSec": 47.91,
        "cues": [
          {
            "start": 0.14,
            "end": 7.82,
            "text": "Capítulo 4: Control de flujo moderno en plantillas. Con este módulo cerramos el Nivel Básico dominando la sintaxis nativa de Angular 22."
          },
          {
            "start": 8.27,
            "end": 16.75,
            "text": "Atrás quedaron los antiguos *ngIf o los .map() difíciles de leer: hoy escribes condiciones y bucles claros directo en el HTML."
          },
          {
            "start": 17.1,
            "end": 25.34,
            "text": "Imagina abrir tu mochila de entrenador. Con @for recorres tus objetos indicando siempre una clave única con track para reciclar nodos a máxima velocidad."
          },
          {
            "start": 25.69,
            "end": 32.89,
            "text": "Si un filtro deja el bolsillo vacío, el bloque @empty aparece justo debajo y muestra el aviso automático sin condiciones extra."
          },
          {
            "start": 33.27,
            "end": 40.07,
            "text": "Dentro del bucle, @let define variables locales limpias para saber si un objeto está agotado, mientras @if elige el color correcto."
          },
          {
            "start": 40.42,
            "end": 47.46,
            "text": "Y como novedad en Angular 22, @switch te deja agrupar varios @case seguidos, como curación y captura, sin duplicar HTML."
          }
        ]
      },
      "dalia": {
        "audioUrl": "audiobook/dalia/capitulo-04.mp3",
        "durationSec": 50.0,
        "cues": [
          {
            "start": 0.14,
            "end": 8.27,
            "text": "Capítulo 4: Control de flujo moderno en plantillas. Con este módulo cerramos el Nivel Básico dominando la sintaxis nativa de Angular 22."
          },
          {
            "start": 8.72,
            "end": 17.28,
            "text": "Atrás quedaron los antiguos *ngIf o los .map() difíciles de leer: hoy escribes condiciones y bucles claros directo en el HTML."
          },
          {
            "start": 17.63,
            "end": 26.33,
            "text": "Imagina abrir tu mochila de entrenador. Con @for recorres tus objetos indicando siempre una clave única con track para reciclar nodos a máxima velocidad."
          },
          {
            "start": 26.68,
            "end": 33.8,
            "text": "Si un filtro deja el bolsillo vacío, el bloque @empty aparece justo debajo y muestra el aviso automático sin condiciones extra."
          },
          {
            "start": 34.18,
            "end": 41.22,
            "text": "Dentro del bucle, @let define variables locales limpias para saber si un objeto está agotado, mientras @if elige el color correcto."
          },
          {
            "start": 41.57,
            "end": 49.55,
            "text": "Y como novedad en Angular 22, @switch te deja agrupar varios @case seguidos, como curación y captura, sin duplicar HTML."
          }
        ]
      }
    }
  },
  {
    "stepId": 5,
    "chapterTitle": "Capítulo 5 · Reactividad Zoneless con Signals",
    "tracks": {
      "gonzalo": {
        "audioUrl": "audiobook/gonzalo/capitulo-05.mp3",
        "durationSec": 49.5,
        "cues": [
          {
            "start": 0.14,
            "end": 6.84,
            "text": "¡Excelente, ya llegaste al Nivel Intermedio! Abrimos el Capítulo 5: Reactividad Zoneless usando Signals."
          },
          {
            "start": 7.29,
            "end": 16.48,
            "text": "Aquí entramos al verdadero motor de Angular actual. Las aplicaciones son Zoneless y OnPush por defecto, logrando precisión quirúrgica en cada cambio."
          },
          {
            "start": 16.86,
            "end": 24.38,
            "text": "En lugar de revisar toda la pantalla por si algo cambió, una Signal envuelve un valor, como el nivel 12 de Pikachu o el estado de una Piedra Trueno."
          },
          {
            "start": 24.73,
            "end": 31.93,
            "text": "La regla de oro es leer siempre una Signal llamándola con paréntesis: quien la lee queda suscrito automáticamente a ese dato exacto."
          },
          {
            "start": 32.31,
            "end": 40.38,
            "text": "Para cambiarla tienes dos métodos súper claros: .set() asigna un valor nuevo directo, como activar la Piedra Trueno en true o reiniciar."
          },
          {
            "start": 40.73,
            "end": 49.05,
            "text": "En cambio, .update() calcula el nuevo valor partiendo del anterior, ideal para subir el nivel de Pikachu hasta evolucionar a Raichu al Nv. 16."
          }
        ]
      },
      "dalia": {
        "audioUrl": "audiobook/dalia/capitulo-05.mp3",
        "durationSec": 51.37,
        "cues": [
          {
            "start": 0.14,
            "end": 6.85,
            "text": "¡Excelente, ya llegaste al Nivel Intermedio! Abrimos el Capítulo 5: Reactividad Zoneless usando Signals."
          },
          {
            "start": 7.3,
            "end": 16.97,
            "text": "Aquí entramos al verdadero motor de Angular actual. Las aplicaciones son Zoneless y OnPush por defecto, logrando precisión quirúrgica en cada cambio."
          },
          {
            "start": 17.35,
            "end": 25.09,
            "text": "En lugar de revisar toda la pantalla por si algo cambió, una Signal envuelve un valor, como el nivel 12 de Pikachu o el estado de una Piedra Trueno."
          },
          {
            "start": 25.44,
            "end": 33.03,
            "text": "La regla de oro es leer siempre una Signal llamándola con paréntesis: quien la lee queda suscrito automáticamente a ese dato exacto."
          },
          {
            "start": 33.41,
            "end": 41.73,
            "text": "Para cambiarla tienes dos métodos súper claros: .set() asigna un valor nuevo directo, como activar la Piedra Trueno en true o reiniciar."
          },
          {
            "start": 42.08,
            "end": 50.92,
            "text": "En cambio, .update() calcula el nuevo valor partiendo del anterior, ideal para subir el nivel de Pikachu hasta evolucionar a Raichu al Nv. 16."
          }
        ]
      }
    }
  },
  {
    "stepId": 6,
    "chapterTitle": "Capítulo 6 · Estado derivado con computed y linkedSignal",
    "tracks": {
      "gonzalo": {
        "audioUrl": "audiobook/gonzalo/capitulo-06.mp3",
        "durationSec": 44.37,
        "cues": [
          {
            "start": 0.14,
            "end": 4.54,
            "text": "Capítulo 6: Estado derivado con computed() y reinicio inteligente con linkedSignal()."
          },
          {
            "start": 4.99,
            "end": 10.99,
            "text": "Uno de los errores más comunes al programar interfaces es duplicar variables y sufrir para mantenerlas sincronizadas a mano."
          },
          {
            "start": 11.34,
            "end": 18.03,
            "text": "En Angular 22, si un dato puede calcularse desde otras Signals, jamás lo guardes aparte: decláralo con computed()."
          },
          {
            "start": 18.38,
            "end": 26.96,
            "text": "Así calculamos el ataque potenciado de Charizard o la ruta de su imagen: computed() es perezoso y memoriza el resultado sin listas de dependencias."
          },
          {
            "start": 27.38,
            "end": 34.54,
            "text": "Pero imagina ahora un caso muy real: activas el modo Shiny ✨ mientras miras a Charizard, y luego cambias a Gyarados o a Umbreon."
          },
          {
            "start": 34.89,
            "end": 43.92,
            "text": "Queremos que puedas alternar el brillo libremente, pero que vuelva a false al cambiar de Pokémon. Justo para eso existe linkedSignal(), sin efectos secundarios."
          }
        ]
      },
      "dalia": {
        "audioUrl": "audiobook/dalia/capitulo-06.mp3",
        "durationSec": 46.86,
        "cues": [
          {
            "start": 0.14,
            "end": 4.9,
            "text": "Capítulo 6: Estado derivado con computed() y reinicio inteligente con linkedSignal()."
          },
          {
            "start": 5.35,
            "end": 12.15,
            "text": "Uno de los errores más comunes al programar interfaces es duplicar variables y sufrir para mantenerlas sincronizadas a mano."
          },
          {
            "start": 12.5,
            "end": 19.14,
            "text": "En Angular 22, si un dato puede calcularse desde otras Signals, jamás lo guardes aparte: decláralo con computed()."
          },
          {
            "start": 19.49,
            "end": 28.77,
            "text": "Así calculamos el ataque potenciado de Charizard o la ruta de su imagen: computed() es perezoso y memoriza el resultado sin listas de dependencias."
          },
          {
            "start": 29.19,
            "end": 36.94,
            "text": "Pero imagina ahora un caso muy real: activas el modo Shiny ✨ mientras miras a Charizard, y luego cambias a Gyarados o a Umbreon."
          },
          {
            "start": 37.29,
            "end": 46.41,
            "text": "Queremos que puedas alternar el brillo libremente, pero que vuelva a false al cambiar de Pokémon. Justo para eso existe linkedSignal(), sin efectos secundarios."
          }
        ]
      }
    }
  },
  {
    "stepId": 7,
    "chapterTitle": "Capítulo 7 · Componentes reutilizables con input, output y model",
    "tracks": {
      "gonzalo": {
        "audioUrl": "audiobook/gonzalo/capitulo-07.mp3",
        "durationSec": 44.26,
        "cues": [
          {
            "start": 0.14,
            "end": 4.45,
            "text": "Capítulo 7: Comunicación entre componentes usando input(), output() y model()."
          },
          {
            "start": 4.9,
            "end": 12.24,
            "text": "Cuando tu Pokédex crece, la clave arquitectónica es dividir la interfaz en piezas pequeñas y reutilizables, como <app-pokeball-picker>."
          },
          {
            "start": 12.59,
            "end": 20.98,
            "text": "En Angular 22, los datos que entran al hijo se declaran con input(), o input.required() si ese valor es obligatorio, como el nombre del legendario."
          },
          {
            "start": 21.36,
            "end": 27.84,
            "text": "Lo mejor es que cada input() ya es una Signal de solo lectura, lista para conectarse directo a un computed() dentro del componente hijo."
          },
          {
            "start": 28.19,
            "end": 35.22,
            "text": "Cuando el hijo le avisa al padre que el usuario lanzó la esfera contra Mewtwo, Articuno o Zapdos, emite un evento tipado con output()."
          },
          {
            "start": 35.57,
            "end": 43.81,
            "text": "Y si ambos necesitan leer y cambiar la misma Pokébola a la vez, usamos model() con [(selectedBall)]. Pruébalo eligiendo la Master Ball desde el padre."
          }
        ]
      },
      "dalia": {
        "audioUrl": "audiobook/dalia/capitulo-07.mp3",
        "durationSec": 46.17,
        "cues": [
          {
            "start": 0.14,
            "end": 4.63,
            "text": "Capítulo 7: Comunicación entre componentes usando input(), output() y model()."
          },
          {
            "start": 5.08,
            "end": 12.77,
            "text": "Cuando tu Pokédex crece, la clave arquitectónica es dividir la interfaz en piezas pequeñas y reutilizables, como <app-pokeball-picker>."
          },
          {
            "start": 13.12,
            "end": 21.8,
            "text": "En Angular 22, los datos que entran al hijo se declaran con input(), o input.required() si ese valor es obligatorio, como el nombre del legendario."
          },
          {
            "start": 22.18,
            "end": 29.12,
            "text": "Lo mejor es que cada input() ya es una Signal de solo lectura, lista para conectarse directo a un computed() dentro del componente hijo."
          },
          {
            "start": 29.47,
            "end": 36.51,
            "text": "Cuando el hijo le avisa al padre que el usuario lanzó la esfera contra Mewtwo, Articuno o Zapdos, emite un evento tipado con output()."
          },
          {
            "start": 36.86,
            "end": 45.72,
            "text": "Y si ambos necesitan leer y cambiar la misma Pokébola a la vez, usamos model() con [(selectedBall)]. Pruébalo eligiendo la Master Ball desde el padre."
          }
        ]
      }
    }
  },
  {
    "stepId": 8,
    "chapterTitle": "Capítulo 8 · Estado global con Servicios, inject y effect",
    "tracks": {
      "gonzalo": {
        "audioUrl": "audiobook/gonzalo/capitulo-08.mp3",
        "durationSec": 46.95,
        "cues": [
          {
            "start": 0.14,
            "end": 6.29,
            "text": "Capítulo 8: Estado global compartido con Servicios, inject() y effect(). Así completamos el Nivel Intermedio."
          },
          {
            "start": 6.74,
            "end": 14.5,
            "text": "¿Cómo compartimos tu cinturón de 6 Pokémon entre la barra superior, la Pokédex y este tutorial sin pasar props por diez niveles?"
          },
          {
            "start": 14.88,
            "end": 23.52,
            "text": "Creamos un servicio @Injectable({ providedIn: 'root' }). Así obtenemos un store único en memoria, como Pinia o Zustand, integrado de fábrica."
          },
          {
            "start": 23.9,
            "end": 30.7,
            "text": "Olvida los constructores eternos: cualquier pantalla accede al store en una sola línea limpia invocando inject(TeamStore)."
          },
          {
            "start": 31.05,
            "end": 38.71,
            "text": "Como buena práctica, en TeamStore mantenemos la Signal privada y exponemos .asReadonly() junto a métodos claros para capturar o liberar."
          },
          {
            "start": 39.09,
            "end": 46.5,
            "text": "Por último, reservamos effect() solo para sincronizar con el exterior, como guardar tu equipo en localStorage para que sobreviva al F5."
          }
        ]
      },
      "dalia": {
        "audioUrl": "audiobook/dalia/capitulo-08.mp3",
        "durationSec": 48.14,
        "cues": [
          {
            "start": 0.14,
            "end": 6.65,
            "text": "Capítulo 8: Estado global compartido con Servicios, inject() y effect(). Así completamos el Nivel Intermedio."
          },
          {
            "start": 7.1,
            "end": 15.02,
            "text": "¿Cómo compartimos tu cinturón de 6 Pokémon entre la barra superior, la Pokédex y este tutorial sin pasar props por diez niveles?"
          },
          {
            "start": 15.4,
            "end": 24.11,
            "text": "Creamos un servicio @Injectable({ providedIn: 'root' }). Así obtenemos un store único en memoria, como Pinia o Zustand, integrado de fábrica."
          },
          {
            "start": 24.49,
            "end": 31.5,
            "text": "Olvida los constructores eternos: cualquier pantalla accede al store en una sola línea limpia invocando inject(TeamStore)."
          },
          {
            "start": 31.85,
            "end": 39.59,
            "text": "Como buena práctica, en TeamStore mantenemos la Signal privada y exponemos .asReadonly() junto a métodos claros para capturar o liberar."
          },
          {
            "start": 39.97,
            "end": 47.69,
            "text": "Por último, reservamos effect() solo para sincronizar con el exterior, como guardar tu equipo en localStorage para que sobreviva al F5."
          }
        ]
      }
    }
  },
  {
    "stepId": 9,
    "chapterTitle": "Capítulo 9 · Peticiones HTTP reactivas e Interceptores funcionales",
    "tracks": {
      "gonzalo": {
        "audioUrl": "audiobook/gonzalo/capitulo-09.mp3",
        "durationSec": 47.79,
        "cues": [
          {
            "start": 0.14,
            "end": 8.82,
            "text": "¡Bienvenido al Nivel Avanzado! Iniciamos el tramo final con el Capítulo 9: Datos reales de red con httpResource() e Interceptores funcionales."
          },
          {
            "start": 9.27,
            "end": 16.31,
            "text": "Hasta aquí jugamos con datos locales, pero una aplicación real conversa todo el tiempo con servidores externos como la PokéAPI oficial."
          },
          {
            "start": 16.66,
            "end": 21.51,
            "text": "Angular 22 integra la red directamente en el grafo reactivo mediante httpResource()."
          },
          {
            "start": 21.86,
            "end": 32.16,
            "text": "Le pasas una función con tu Signal de búsqueda: si cambias rápido entre Charizard, Lucario o un ID hasta 1025, cancela automáticamente la llamada anterior."
          },
          {
            "start": 32.56,
            "end": 39.6,
            "text": "Además, te regala Signals listas para saber si está cargando (isLoading), si saltó un error 404 (error) o si ya llegó el Pokémon (hasValue)."
          },
          {
            "start": 39.98,
            "end": 47.34,
            "text": "En paralelo, nuestro HttpInterceptorFn centraliza cada petición de la app, midiendo en vivo los milisegundos de cada respuesta en la consola del laboratorio."
          }
        ]
      },
      "dalia": {
        "audioUrl": "audiobook/dalia/capitulo-09.mp3",
        "durationSec": 49.66,
        "cues": [
          {
            "start": 0.14,
            "end": 8.46,
            "text": "¡Bienvenido al Nivel Avanzado! Iniciamos el tramo final con el Capítulo 9: Datos reales de red con httpResource() e Interceptores funcionales."
          },
          {
            "start": 8.91,
            "end": 15.95,
            "text": "Hasta aquí jugamos con datos locales, pero una aplicación real conversa todo el tiempo con servidores externos como la PokéAPI oficial."
          },
          {
            "start": 16.3,
            "end": 21.42,
            "text": "Angular 22 integra la red directamente en el grafo reactivo mediante httpResource()."
          },
          {
            "start": 21.77,
            "end": 32.83,
            "text": "Le pasas una función con tu Signal de búsqueda: si cambias rápido entre Charizard, Lucario o un ID hasta 1025, cancela automáticamente la llamada anterior."
          },
          {
            "start": 33.23,
            "end": 40.59,
            "text": "Además, te regala Signals listas para saber si está cargando (isLoading), si saltó un error 404 (error) o si ya llegó el Pokémon (hasValue)."
          },
          {
            "start": 40.97,
            "end": 49.21,
            "text": "En paralelo, nuestro HttpInterceptorFn centraliza cada petición de la app, midiendo en vivo los milisegundos de cada respuesta en la consola del laboratorio."
          }
        ]
      }
    }
  },
  {
    "stepId": 10,
    "chapterTitle": "Capítulo 10 · Interoperabilidad entre RxJS y Signals",
    "tracks": {
      "gonzalo": {
        "audioUrl": "audiobook/gonzalo/capitulo-10.mp3",
        "durationSec": 46.82,
        "cues": [
          {
            "start": 0.14,
            "end": 4.14,
            "text": "Capítulo 10: Interoperabilidad fluida entre RxJS y Signals."
          },
          {
            "start": 4.59,
            "end": 10.83,
            "text": "Una pregunta clásica al modernizar código es: si ya tenemos Signals, ¿para qué seguimos usando RxJS?"
          },
          {
            "start": 11.21,
            "end": 20.65,
            "text": "La respuesta es sencilla: las Signals brillan guardando estado actual, mientras RxJS es imbatible coordinando flujos de eventos en el tiempo."
          },
          {
            "start": 21.05,
            "end": 29.35,
            "text": "Imagina un buscador instantáneo: si consultaras el servidor en cada letra al teclear Garchomp, dispararías 8 peticiones seguidas sin necesidad."
          },
          {
            "start": 29.7,
            "end": 36.74,
            "text": "Con rxjs-interop lo resuelves en tres líneas: primero conviertes la Signal del texto en un Observable usando toObservable()."
          },
          {
            "start": 37.09,
            "end": 46.37,
            "text": "Luego aplicas debounceTime(350) y distinctUntilChanged(), devolviendo el resultado a una Signal limpia con toSignal() que cierra la suscripción sola."
          }
        ]
      },
      "dalia": {
        "audioUrl": "audiobook/dalia/capitulo-10.mp3",
        "durationSec": 49.85,
        "cues": [
          {
            "start": 0.14,
            "end": 4.99,
            "text": "Capítulo 10: Interoperabilidad fluida entre RxJS y Signals."
          },
          {
            "start": 5.44,
            "end": 12.08,
            "text": "Una pregunta clásica al modernizar código es: si ya tenemos Signals, ¿para qué seguimos usando RxJS?"
          },
          {
            "start": 12.46,
            "end": 22.7,
            "text": "La respuesta es sencilla: las Signals brillan guardando estado actual, mientras RxJS es imbatible coordinando flujos de eventos en el tiempo."
          },
          {
            "start": 23.1,
            "end": 31.57,
            "text": "Imagina un buscador instantáneo: si consultaras el servidor en cada letra al teclear Garchomp, dispararías 8 peticiones seguidas sin necesidad."
          },
          {
            "start": 31.92,
            "end": 39.77,
            "text": "Con rxjs-interop lo resuelves en tres líneas: primero conviertes la Signal del texto en un Observable usando toObservable()."
          },
          {
            "start": 40.12,
            "end": 49.4,
            "text": "Luego aplicas debounceTime(350) y distinctUntilChanged(), devolviendo el resultado a una Signal limpia con toSignal() que cierra la suscripción sola."
          }
        ]
      }
    }
  },
  {
    "stepId": 11,
    "chapterTitle": "Capítulo 11 · Signal Forms avanzados y validación cruzada",
    "tracks": {
      "gonzalo": {
        "audioUrl": "audiobook/gonzalo/capitulo-11.mp3",
        "durationSec": 42.91,
        "cues": [
          {
            "start": 0.14,
            "end": 5.07,
            "text": "Capítulo 11: Formularios reactivos de nueva generación con Signal Forms y validación cruzada."
          },
          {
            "start": 5.52,
            "end": 11.59,
            "text": "Durante años, los formularios grandes sufrían de nombres de campos en strings mágicos y tipos débiles."
          },
          {
            "start": 11.94,
            "end": 18.18,
            "text": "En Angular 22, Signal Forms parte de un modelo en Signal, como la ficha competitiva VGC de Cynthia con Garchomp y Lucario."
          },
          {
            "start": 18.53,
            "end": 26.29,
            "text": "Al construir el formulario recibes rutas tipadas con autocompletado total para exigir nombre obligatorio, longitud mínima y nivel entre 50 y 100."
          },
          {
            "start": 26.67,
            "end": 33.52,
            "text": "Pero la verdadera magia aparece en reglas que cruzan varios campos, como la Item Clause del formato competitivo oficial VGC."
          },
          {
            "start": 33.9,
            "end": 42.46,
            "text": "Usando validate() y valueOf(), comparas el objeto del Slot 2 contra el Slot 1: si ambos equipan Vidasfera, el formulario bloquea la inscripción al instante."
          }
        ]
      },
      "dalia": {
        "audioUrl": "audiobook/dalia/capitulo-11.mp3",
        "durationSec": 45.57,
        "cues": [
          {
            "start": 0.14,
            "end": 5.8,
            "text": "Capítulo 11: Formularios reactivos de nueva generación con Signal Forms y validación cruzada."
          },
          {
            "start": 6.25,
            "end": 12.57,
            "text": "Durante años, los formularios grandes sufrían de nombres de campos en strings mágicos y tipos débiles."
          },
          {
            "start": 12.92,
            "end": 19.79,
            "text": "En Angular 22, Signal Forms parte de un modelo en Signal, como la ficha competitiva VGC de Cynthia con Garchomp y Lucario."
          },
          {
            "start": 20.14,
            "end": 28.44,
            "text": "Al construir el formulario recibes rutas tipadas con autocompletado total para exigir nombre obligatorio, longitud mínima y nivel entre 50 y 100."
          },
          {
            "start": 28.82,
            "end": 35.94,
            "text": "Pero la verdadera magia aparece en reglas que cruzan varios campos, como la Item Clause del formato competitivo oficial VGC."
          },
          {
            "start": 36.32,
            "end": 45.12,
            "text": "Usando validate() y valueOf(), comparas el objeto del Slot 2 contra el Slot 1: si ambos equipan Vidasfera, el formulario bloquea la inscripción al instante."
          }
        ]
      }
    }
  },
  {
    "stepId": 12,
    "chapterTitle": "Capítulo 12 · Carga diferida con @defer, Directivas Host y Vitest",
    "tracks": {
      "gonzalo": {
        "audioUrl": "audiobook/gonzalo/capitulo-12.mp3",
        "durationSec": 48.92,
        "cues": [
          {
            "start": 0.14,
            "end": 6.92,
            "text": "Llegamos al gran cierre del curso con el Capítulo 12: Carga diferida con @defer, Directivas Host y pruebas con Vitest 5."
          },
          {
            "start": 7.37,
            "end": 13.93,
            "text": "Un desarrollador senior en Angular 22 no solo escribe código limpio, también cuida que la página inicial arranque súper rápido."
          },
          {
            "start": 14.28,
            "end": 22.76,
            "text": "En lugar de descargar desde el inicio componentes pesados como el radar de stats de Rayquaza, los envuelves en @defer (on interaction) o (on viewport)."
          },
          {
            "start": 23.14,
            "end": 29.86,
            "text": "Angular divide el bundle automáticamente, muestra @placeholder y gestiona @loading sin configurar rutas manualmente."
          },
          {
            "start": 30.21,
            "end": 39.01,
            "text": "Además, para añadir brillos dinámicos de tipo Dragón, Psíquico o Eléctrico sobre cualquier etiqueta, creas una Directiva declarando los eventos en host: {}."
          },
          {
            "start": 39.39,
            "end": 48.42,
            "text": "Por último, corres tus pruebas unitarias con Vitest en milisegundos antes de cada entrega. ¡Felicitaciones entrenador, completaste los 12 módulos de Angular 22!"
          }
        ]
      },
      "dalia": {
        "audioUrl": "audiobook/dalia/capitulo-12.mp3",
        "durationSec": 50.1,
        "cues": [
          {
            "start": 0.14,
            "end": 7.15,
            "text": "Llegamos al gran cierre del curso con el Capítulo 12: Carga diferida con @defer, Directivas Host y pruebas con Vitest 5."
          },
          {
            "start": 7.6,
            "end": 14.56,
            "text": "Un desarrollador senior en Angular 22 no solo escribe código limpio, también cuida que la página inicial arranque súper rápido."
          },
          {
            "start": 14.91,
            "end": 23.46,
            "text": "En lugar de descargar desde el inicio componentes pesados como el radar de stats de Rayquaza, los envuelves en @defer (on interaction) o (on viewport)."
          },
          {
            "start": 23.84,
            "end": 30.95,
            "text": "Angular divide el bundle automáticamente, muestra @placeholder y gestiona @loading sin configurar rutas manualmente."
          },
          {
            "start": 31.3,
            "end": 40.02,
            "text": "Además, para añadir brillos dinámicos de tipo Dragón, Psíquico o Eléctrico sobre cualquier etiqueta, creas una Directiva declarando los eventos en host: {}."
          },
          {
            "start": 40.4,
            "end": 49.6,
            "text": "Por último, corres tus pruebas unitarias con Vitest en milisegundos antes de cada entrega. ¡Felicitaciones entrenador, completaste los 12 módulos de Angular 22!"
          }
        ]
      }
    }
  }
];
