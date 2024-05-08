export type Settings = {
  isDarkMode: string
  defaultOrganization: string
}

export function SetSettings(settings: Partial<Settings>): void {
  for (const key in settings) {
    if (Object.prototype.hasOwnProperty.call(settings, key)) {
      localStorage.setItem(key, settings[key as keyof Settings] as string)
    }
  }
}

export function GetSettings(): Settings {
  return {
    isDarkMode: localStorage.getItem('isDarkMode') || '',
    defaultOrganization: localStorage.getItem('defaultOrganization') || '',
  }
}
