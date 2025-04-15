# Comentarios del front

## Dependencias
- framer-motion para hacer aniamaciones con el cambio de NavLinks del control que hay en el footer.

1. Significado del TRANSITION del motion en el footer:
```js
                                <motion.div
                                    layoutId="dots"
                                    className="Footer-dots"
                                    transition={{type: "spring", stiffness: 140, damping: 15}}
                                    >
                                    <span className="dot"></span>
                                    <span className="dot"></span>
                                    <span className="dot"></span>

                                    
                                </motion.div>

                                
/**
 * Transición en Framer Motion para la animación en el  footer de muelle en los 3 puntos
 * type "srping": que es elástico
 * stiffness: que tan fuerte es el muelle (mas alto mas rapido)
 * dampping: cuanto rebote tiene (cuanto mas alto menos rebote)
 * 
 * 
 */
```