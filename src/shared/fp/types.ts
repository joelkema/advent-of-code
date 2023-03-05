export type Debuggable = {
    /**
     * @name toString
     * @description This method is important in debugging as a simple emit would not give you the type
     * @methodOf Debuggable#
     * @public
     */
    toString: () => string;
};

export type Functor<A> = Debuggable & {
    /**
     * @name map
     * @description Alias for fmap. Fantasy Land Monad conformance.
     * fmap :: (a -> b) -> f a -> f b
     * @methodOf Functor#
     * @public
     * @see Functor#fmap
     */
    map<B>(f: (t: A) => B): Functor<B>;

    /**
     * @name emit
     * @description Takes the content out of the box
     * @methodOf Functor#
     * @public
     */
    emit: () => A;
};

export type Monad<A> = Functor<A> & {
    /**
     * @name bind
     * @description Apply the function passed as parameter on the object.
     * @methodOf Monad#
     * @public
     * @param {(t: A) => Monad<B>} f Function applied on the Monad content.
     * @returns {Monad<B>} The result of the function f wrapped inside
     *     a Monad object.
     */
    bind<B>(f: (t: A) => Monad<B>): Monad<B>;
    /**
     * @name chain
     * @description Alias for bind. Fantasy Land Monad conformance.
     * @methodOf Monad#
     * @public
     * @see Monad#bind
     */
    chain<B>(f: (t: A) => Monad<B>): Monad<B>;
};

export type Maybe<A> = Debuggable & {
    /**
     * @name $value
     * @description Unwraps the value
     * @methodOf Monad#
     * @public
     * @param {(t: A) => Monad<B>} f Function applied on the Monad content.
     * @returns {Monad<B>} The result of the function f wrapped inside
     *     a Monad object.
     */
    $value: A;

    /**
     * @name bind
     * @description Apply the function passed as parameter on the object.
     * @methodOf Monad#
     * @public
     * @param {(t: A) => Monad<B>} f Function applied on the Monad content.
     * @returns {Monad<B>} The result of the function f wrapped inside
     *     a Monad object.
     */
    bind<B>(f: (t: A) => Maybe<B>): Maybe<B> | Maybe<null>;
    /**
     * @name chain
     * @description Alias for bind. Fantasy Land Monad conformance.
     * @methodOf Monad#
     * @public
     * @see Monad#bind
     */
    chain<B>(f: (t: A) => Maybe<B>): Maybe<B> | Maybe<null>;

    /**
     * @name map
     * @description Alias for fmap. Fantasy Land Monad conformance.
     * fmap :: (a -> b) -> f a -> f b
     * @methodOf Identity#
     * @public
     * @see Identity#fmap
     */
    map<B>(f: (t: A) => B): Maybe<B> | Maybe<null>;

    /**
     * @name emit
     * @description Takes the content out of the box
     * @methodOf Functor#
     * @public
     */
    emit: () => A;
};
