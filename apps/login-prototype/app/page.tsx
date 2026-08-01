"use client";

import { FormEvent, useState } from "react";
import { Button, Card, Checkbox, Field, Input } from "@arcsyn-io/react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(false);
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 700));
    setLoading(false);
    setSubmitted(true);
  }

  return (
    <main className="login-shell">
      <section className="login-hero" aria-labelledby="hero-title">
        <div className="brand-lockup" aria-label="ArcSyn">
          <span className="brand-mark" aria-hidden="true"><span /></span>
          <span>ARCSYN</span>
        </div>

        <div className="hero-copy">
          <p className="hero-eyebrow"><span aria-hidden="true" /> CONTROL PLANE · AMBIENTE SEGURO</p>
          <h1 id="hero-title">Decisões críticas.<br /><span>Operação contínua.</span></h1>
          <p className="hero-summary">Centralize serviços, automações e sinais operacionais com rastreabilidade de ponta a ponta.</p>
        </div>

        <div className="hero-footer">
          <div><span className="status-dot" aria-hidden="true" /><span>Serviços operacionais</span></div>
          <span className="hero-footer__meta">SLA 99,99% · SAO-1</span>
        </div>
      </section>

      <section className="login-panel" aria-labelledby="login-title">
        <div className="login-panel__inner">
          <p className="mobile-brand">ARCSYN / CONTROL PLANE</p>
          <Card className="login-card">
            <Card.Header>
              <Card.Heading>
                <Card.Eyebrow>Acesso restrito</Card.Eyebrow>
                <Card.Title as="h2" id="login-title">Entre na sua conta</Card.Title>
                <Card.Description>Use suas credenciais corporativas para continuar.</Card.Description>
              </Card.Heading>
            </Card.Header>

            <Card.Content>
              <form className="login-form" onSubmit={handleSubmit}>
                <Field.Root>
                  <Field.Label htmlFor="email">E-mail corporativo</Field.Label>
                  <Input id="email" name="email" type="email" autoComplete="email" placeholder="nome@empresa.com" size="lg" required />
                </Field.Root>

                <Field.Root>
                  <div className="field-label-row">
                    <Field.Label htmlFor="password">Senha</Field.Label>
                    <a href="#recuperar">Esqueci minha senha</a>
                  </div>
                  <div className="password-field">
                    <Input id="password" name="password" type={showPassword ? "text" : "password"} autoComplete="current-password" placeholder="Digite sua senha" size="lg" minLength={8} required />
                    <button type="button" className="password-toggle" aria-pressed={showPassword} onClick={() => setShowPassword((value) => !value)}>
                      {showPassword ? "Ocultar" : "Mostrar"}
                    </button>
                  </div>
                </Field.Root>

                <label className="remember-control">
                  <Checkbox name="remember" />
                  <span>Manter sessão neste dispositivo</span>
                </label>

                <Button className="login-submit" type="submit" size="lg" loading={loading}>Acessar ambiente</Button>
                {submitted && <p className="form-notice" role="status"><span aria-hidden="true">✓</span> Protótipo validado. A autenticação será conectada na integração.</p>}
              </form>
            </Card.Content>
          </Card>

          <p className="support-copy">Problemas com o acesso? <a href="mailto:suporte@arcsyn.io">Fale com o suporte</a></p>
          <p className="legal-copy">Ao continuar, você concorda com os Termos de Uso e a Política de Privacidade.</p>
        </div>
      </section>
    </main>
  );
}
